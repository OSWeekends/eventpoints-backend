var _ = require('lodash'),
    uuidV4 = require('uuid/v4'),
    fs = require('fs');

module.exports = function(goblinDB) {
    var arrayEventos = [];
    fs.readdir('../scrapers/output', function (err, files) {
        if(err){
            console.log("ERROR reading ../scrapers/output:", err);
        } else {

            files.forEach(function(file){

                
            
                if (/.json/.test(file)) {

                    //Load refreshed file
                    var currentArray = [];

                    try {
                        var fileContent = fs.readFileSync(`../scrapers/output/${file}`,'utf8');
                        currentArray = JSON.parse(fileContent);                    
                    } catch (error) {
                        console.log(`Error parseando ${file}`);
                    }

                    if (currentArray.length > 0) {
                        arrayEventos = _.concat(arrayEventos, currentArray);
                    }
                    
                }
            });
    
            /*
                Filtering duplicate elements
                @see https://lodash.com/docs/4.17.4#uniqBy
            */
            //arrayEventos = _.uniqBy(arrayEventos, "target_url");
    
            // adding UUIDs
            arrayEventos.forEach(function(event) {
                event.id = uuidV4();
            });
    
            goblinDB.set(arrayEventos, "events");
        }
    });

};