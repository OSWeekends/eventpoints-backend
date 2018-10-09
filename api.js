var project = require('pillars'),
    GDB = require('goblindb'),
    
// Starting the project
var eventsApi = project.services.get('http').configure({
    port: process.env.PORT || 3000
})

eventsApi.start();

var data = require('./test_data.json');
var goblinDB = GDB();
goblinDB.set({events: data});

// Define Rutes
var pingRoute = require('./routes/index');
var eventsRoute = require('./routes/events')(goblinDB);
var eventByIdRoute = require('./routes/eventById')(goblinDB);

// Adding routes objects to the project
project.routes.add(pingRoute);
project.routes.add(eventsRoute);
project.routes.add(eventByIdRoute);

// No updates until scrappers are done
goblinDB.on('change', function(){
    data = goblinDB.get("events");
});


module.exports = eventsApi;
