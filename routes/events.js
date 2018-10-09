module.exports = function(goblinDB) {
 
    var eventsRouter = new Route({
        id: 'staticRoute',
        path: 'api/v1/events',
        cors: true
    }, function(gw) {
        var data = goblinDB.get('events');
        gw.json(data, {
            deep: 10
        });
    });

    return eventsRouter;
    
}
