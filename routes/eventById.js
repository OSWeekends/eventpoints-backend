var _ = require('lodash');

module.exports = function(goblinDB) {
 
    var eventsRouter = new Route({
        id: 'staticRoute',
        path: 'api/v1/events/*:path',
        cors: true
    }, function(gw) {

        var item = _.find(goblinDB.get('events'), {id: gw.params.path});

        if(!item) {
            gw.statusCode = 404;
            gw.json({});
        } else {
            gw.json(item);
        }

        
    });

    return eventsRouter;
    
}
