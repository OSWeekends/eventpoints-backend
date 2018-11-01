const _ = require('lodash'),
    uuidV4 = require('uuid/v4'),
    fs = require('fs');

module.exports = function(goblinDB, debugMode) {
    
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
    
            // adding UUIDs
            newEventos.forEach(function(event) {
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
           arrayEventos = _.uniqBy(arrayEventos, "target_url");

           if(debugMode) {
                console.log("************ Tras eliminar eventos duplicados: " + arrayEventos.length);
           }
    
           goblinDB.set(arrayEventos, "events");
        }
    });

};