const project = require('pillars');
const GDB = require('@goblindb/goblindb');
const { exec } = require('child_process');
const Scheduled = require('scheduled');
const harmonizer = require('./harmonizer.js');
const sources = require('./sources');
const config = require('./config');

project.config.favicon = './favicon.ico';
project.config.cors = false;

// Starting the project
const eventsApi = project.services.get('http').configure({
  port: process.env.PORT || config.port,
});

eventsApi.start();

const goblinDB = GDB(config.dbConfig, err => {
  if (err) {
    console.log('Error launching DB - will exit');
    exit();
  }

  let data;

  if (config.mockupData) {
    data = require('./test_data.json');
  } else {
    data = goblinDB.get('events');
    if (!data) {
      data = [];
    }
  }

  goblinDB.set(data, 'events');

  // Define Rutes
  const pingRoute = require('./routes/index');
  const eventsRoute = require('./routes/events')(config, goblinDB);
  const eventByIdRoute = require('./routes/eventById')(config, goblinDB);
  const sourcesRoute = require('./routes/sources')(sources);
  const specRoute = require('./routes/spec')();

  // Adding routes objects to the project
  project.routes.add(pingRoute);
  project.routes.add(eventsRoute);
  project.routes.add(eventByIdRoute);
  project.routes.add(sourcesRoute);
  project.routes.add(specRoute);

  // Define here the array of python and R scrapers
  const spidersPy = sources.filter(s => s.type === 'py').map(s => s.id);
  const spidersR = sources.filter(s => s.type === 'r').map(s => s.id);

  // ////////////
  // Cron Tasks
  // ////////////

  // Cron Python
  const pythonRocks = new Scheduled({
    id: 'pythonRocks',
    pattern: config.pythonCron,
    task() {
      console.log(`---- Borro ficheros json! ------`);
      exec('cd ../scrapers/output && rm *.json', error => {
        if (error && config.debugMode) {
          console.log(`Error borrando ficheros: ${error}`);
        }

        spidersPy.forEach(function(spider) {
          console.log(`---- Proceso hijo de ${spider} Iniciado! ------`);
          exec(
            `cd ../scrapers/ && scrapy crawl ${spider} -o ../scrapers/output/${spider}.json`,
            function(error2, stdout2, stderr2) {
              if (stdout2) {
                console.log(`stdout: ${stdout2}`);
              }

              if (stderr2) {
                console.log(`stderr: ${stderr2}`);
              }

              if (error2) {
                console.log(`exec error: ${error2}`);
              }
              console.log(`---- Proceso hijo de ${spider} terminado! -----`);
            }
          );
        });
      });
    },
  });

  // Cron R
  const rTask = new Scheduled({
    id: 'rTask',
    pattern: config.rCron,
    task() {
      spidersR.forEach(function(spider) {
        console.log(`---- Proceso hijo de ${spider} Iniciado! ------`);
        exec(
          `cd ../scrapers/rscraper && R CMD BATCH ${spider}.R ../output/${spider}.json`,
          function(error, stdout, stderr) {
            if (stdout) {
              console.log(`stdout: ${stdout}`);
            }

            if (stderr) {
              console.log(`stderr: ${stderr}`);
            }

            if (error) {
              console.log(`exec error: ${error}`);
            }
            console.log(`---- Proceso hijo de ${spider} terminado! -----`);
          }
        );
      });
    },
  }).start();

  // Cron Harmonizer
  const harmonizerTask = new Scheduled({
    id: 'harmonizerTask',
    pattern: config.harmonizerCron,
    task() {
      harmonizer(goblinDB, sources, config.debugMode);
    },
  }).start();

  // Events supported
  goblinDB.on('change', changes => {
    if (config.debugMode) {
      console.log('Ha habido cambios en la BD:', changes);
    }
  });

  // Si no queremos mockup data, lanzamos los scrappers
  if (!config.mockupData) {
    harmonizerTask.launch();
    pythonRocks.launch();
    // rTask.launch();
  }
});

module.exports = eventsApi;
