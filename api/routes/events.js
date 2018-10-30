module.exports = function(data) {
 
    var eventsRouter = new Route({
        id: 'staticRoute',
        path: 'api/v1/events',
        cors: true
    }, function(gw) {
        gw.json(data, {
            deep: 10
        });
    });

    return eventsRouter;
    
}
