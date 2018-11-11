const project = require('pillars'),
    GDB = require('@goblindb/goblindb'),
    exec = require('child_process').exec,
    Scheduled = require('scheduled'),
    harmonizer = require('./harmonizer.js'),
    sources = require('./sources');
    config = require('./config');

// Starting the project
const eventsApi = project.services.get('http').configure({
    port: process.env.PORT || config.port
})

project.config.favicon = './favicon.ico';

eventsApi.start();

const goblinDB = GDB(config.dbConfig, err => {

    if(err) {
        console.log("Error launching DB - will exit");
        exit();
    }

    var data;

    if(config.mockupData) {
        data = require('./test_data.json');
    } else {
        data = goblinDB.get("events");
        if(!data) {
            data = [];
        }
    }

    // Define Rutes
    const pingRoute = require('./routes/index');
    const eventsRoute = require('./routes/events')(data);
    const eventByIdRoute = require('./routes/eventById')(data);
    const sourcesRoute = require('./routes/sources')(sources);
    const specRoute = require('./routes/spec')();

    // Adding routes objects to the project
    project.routes.add(pingRoute);
    project.routes.add(eventsRoute);
    project.routes.add(eventByIdRoute);
    project.routes.add(sourcesRoute);
    project.routes.add(specRoute);

    //Define here the array of scrappers
    const spiders = sources.map(s => s.id);

    // Cron Tasks
    const pythonRocks = new Scheduled({
        id: "pythonRocks",
        pattern: "45 18 * * * *",
        task: function() {
            console.log(`---- Borro ficheros json! ------`);
            exec('cd ../scrapers/output && rm *.json', function(error, stdout, stderr) {

                if (error && config.debugMode) {
                    console.log('Borrando error: ' + error);
                } 

                spiders.forEach(function (spider) {                    
                        console.log(`---- Proceso hijo de ${spider} Iniciado! ------`);
                        exec('cd ../scrapers/ && scrapy crawl ' + spider + ' -o ../scrapers/output/' + spider + '.json', function(error, stdout, stderr) {
                            
                            if (stdout) {
                                console.log('stdout: ' + stdout);
                            }
            
                            if (stderr) {
                                console.log('stderr: ' + stderr);
                            }
            
                            if (error) {
                                console.log('exec error: ' + error);
                            }
                            console.log(`---- Proceso hijo de ${spider} terminado! -----`);
                        });     
                });
                

            });        
        }
    }).start();

    const harmonizerTask = new Scheduled({
        id: "harmonizerTask",
        pattern: "15 19 * * * *",
        task: function() {
            harmonizer(goblinDB, sources, config.debugMode);
        }
    }).start();

    // Events supported
    goblinDB.on('change', function(changes){
        if(config.debugMode) {
            console.log("Ha habido cambios en la BD");
        }
        data = goblinDB.get("events");
    });

    harmonizerTask.launch();
    //pythonRocks.launch();

});

module.exports = eventsApi;
