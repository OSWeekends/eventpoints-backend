const project = require('pillars');
const GDB = require('@goblindb/goblindb');
const { exec } = require('child_process');
const Scheduled = require('scheduled');
const harmonizer = require('./harmonizer.js');
const sources = require('./sources');
const config = require('./config');

// Define Rutes
const pingRoute = require('./routes/ping');
const eventsRoute = require('./routes/events');
const eventByIdRoute = require('./routes/eventById');
const eventBySourceRoute = require('./routes/eventBySource');
const sourcesRoute = require('./routes/sources');
const specv1Route = require('./routes/spec');
const specv2Route = require('./routes/specv2');

const testData = require('./test_data.json');

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
    data = testData;
  } else {
    data = goblinDB.get('events');
    if (!data) {
      data = [];
    }
  }

  goblinDB.set(data, 'events');

  // Adding routes objects to the project
  // V1
  project.routes.add(pingRoute('/api/v1/', 'V1 Up and runing'));
  project.routes.add(eventsRoute(config, goblinDB, 'api/v1/events'));
  project.routes.add(eventByIdRoute(config, goblinDB, 'api/v1/events/*:path'));
  project.routes.add(sourcesRoute(sources, 'api/v1/sources'));
  project.routes.add(specv1Route());

  // V2
  project.routes.add(pingRoute('/api/v2/', 'V2 Up and runing'));
  project.routes.add(eventsRoute(config, goblinDB, 'api/v2/events'));
  project.routes.add(
    eventByIdRoute(config, goblinDB, 'api/v2/events/id/*:path')
  );
  project.routes.add(eventBySourceRoute(config, goblinDB));
  project.routes.add(sourcesRoute(sources, 'api/v2/sources'));
  project.routes.add(specv2Route());

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
