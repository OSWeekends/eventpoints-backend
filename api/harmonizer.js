const _ = require('lodash'),
    uuidV4 = require('uuid/v4'),
    fs = require('fs'),
    moment = require('moment');

module.exports = function(goblinDB, sources, debugMode) {
    
    if(debugMode) {
        console.log('Ejecuto el harmonizer');
    }

    const currentEventos = goblinDB.get("events");

    if(debugMode) {
        console.log("************ Actualmente en BD: " + currentEventos.length);
    }

    var newEventos = [];

    fs.readdir('../scrapers/output', function (err, files) {
        if(err){
            console.log("ERROR reading ../scrapers/output:", err);
        } else {

            files.forEach(function(file){

                if (/.json/.test(file)) {
                    var currentArray = [];

                    try {
                        var fileContent = fs.readFileSync(`../scrapers/output/${file}`,'utf8');
                        currentArray = JSON.parse(fileContent);                    
                    } catch (error) {
                        console.log(`Error parseando ${file}`);
                    }

                    if (currentArray.length > 0) {
                        newEventos = _.concat(newEventos, currentArray);
                    }
                    
                }
            });
    
            // adding rest of fields
            newEventos.forEach(function(event) {
                const eventDateTime =  Number(event.datetime);
                const fullSource = sources.find(x => x.id === event.source);
                event.source = fullSource;
                event.datetime = eventDateTime;
                event.date = moment(eventDateTime).format("DD-MM-YYYY");
                event.time = moment(eventDateTime).format("HH:mm:ss");
                event.id = uuidV4();
            });

            if(debugMode) {
                console.log("************ Nuevos eventos: " + newEventos.length);
            }

            var arrayEventos = _.concat(newEventos, currentEventos);

            if(debugMode) {
                console.log("************ Tras juntar eventos: " + arrayEventos.length);
            }

            /*
                Filtering duplicate elements
                @see https://lodash.com/docs/4.17.4#uniqBy
            */
           arrayEventos = _.uniqBy(arrayEventos, "target_url"); // Me va a cambiar el ID de eventos antiguos????
           arrayEventos = _.sortBy(arrayEventos, (e) => e.datetime);

           if(debugMode) {
                console.log("************ Tras eliminar eventos duplicados: " + arrayEventos.length);
           }
    
           goblinDB.set(arrayEventos, "events");
        }
    });

};