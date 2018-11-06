const project = require('pillars'),
    GDB = require('@goblindb/goblindb'),
    exec = require('child_process').exec,
    Scheduled = require('scheduled'),
    harmonizer = require('./harmonizer.js');
    
// Starting the project
const eventsApi = project.services.get('http').configure({
    port: process.env.PORT || 3000
})

project.config.favicon = './favicon.ico';

eventsApi.start();

const dbConfig = {
    fileName: 'event_points'
};

const debugMode = false;


const goblinDB = GDB(dbConfig, err => {

    if(err) {
        console.log("Error launching DB - will exit");
        exit();
    }

    var data = goblinDB.get("events");

    if(!data) {
        data = [];
        goblinDB.set(data, "events");
    }

    // Define Rutes
    const pingRoute = require('./routes/index');
    const eventsRoute = require('./routes/events')(data);
    const eventByIdRoute = require('./routes/eventById')(data);
    const sourcesRoute = require('./routes/sources')();
    const specRoute = require('./routes/spec')();

    // Adding routes objects to the project
    project.routes.add(pingRoute);
    project.routes.add(eventsRoute);
    project.routes.add(eventByIdRoute);
    project.routes.add(sourcesRoute);
    project.routes.add(specRoute);

    //Define here the array of scrappers
    const spiders = ['meetup'];

    // Cron Tasks
    const pythonRocks = new Scheduled({
        id: "pythonRocks",
        pattern: "0 0/5 0 ? * * *",
        task: function() {
            console.log(`---- Borro ficheros json! ------`);
            exec('cd ../scrapers/output && rm *.json', function(error, stdout, stderr) {
                if (error) {
                    console.log('Borrando error: ' + error);
                } else {
                    spiders.forEach(function (spider) {                    
                        console.log(`---- Proceso hijo de ${spider} Iniciado! ------`);
                        exec('cd ../scrapers/ && scrapy crawl ' + spider + ' -o ../scrapers/output/' + spider + '.json', function(error, stdout, stderr) {
                            console.log(`---- Proceso hijo de ${spider} terminado! -----`);
                            if (stdout) {
                                console.log('stdout: ' + stdout);
                            }
            
                            if (stderr) {
                                console.log('stderr: ' + stderr);
                            }
            
                            if (error) {
                                console.log('exec error: ' + error);
                            }
                        });     
                    });
                }

            });        
        }
    }).start();

    const harmonizerTask = new Scheduled({
        id: "harmonizerTask",
        pattern: "0 * 0 ? * * *",
        task: function() {
            harmonizer(goblinDB, debugMode);
        }
    }).start();

    // Events supported
    goblinDB.on('change', function(changes){
        data = goblinDB.get("events");
    });

    harmonizerTask.launch();
    //pythonRocks.launch();

});

module.exports = eventsApi;
