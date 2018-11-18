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

    goblinDB.set(data, "events");

    // Define Rutes
    var pingRoute = require('./routes/index');
    var eventsRoute = require('./routes/events')(goblinDB);
    var eventByIdRoute = require('./routes/eventById')(goblinDB);
    var sourcesRoute = require('./routes/sources')(sources);
    var specRoute = require('./routes/spec')();

    // Adding routes objects to the project
    project.routes.add(pingRoute);
    project.routes.add(eventsRoute);
    project.routes.add(eventByIdRoute);
    project.routes.add(sourcesRoute);
    project.routes.add(specRoute);

    //Define here the array of scrappers
    const spiders = sources.map(s => s.id);

    // Cron Tasks

    // */45 * * * * (cada 45 minutos)
    // 0 30 11 * * (a las 11:30 todos los día)
    const pythonRocks = new Scheduled({
        id: "pythonRocks",
        pattern: "*/45 * * * *",
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

    // */55 * * * * (cada 55 minutos)
    // 0 0 12 * * (a las 12:00 todos los día)
    const harmonizerTask = new Scheduled({
        id: "harmonizerTask",
        pattern: "*/55 * * * *",
        task: function() {
            harmonizer(goblinDB, sources, config.debugMode);
        }
    }).start();

    // Events supported
    goblinDB.on('change', function(changes){
        if(config.debugMode) {
            console.log("Ha habido cambios en la BD");
        }
        //data = goblinDB.get("events");
    });

    harmonizerTask.launch();
    pythonRocks.launch();

});

module.exports = eventsApi;
