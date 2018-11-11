const moment = require('moment');

module.exports = function(data) {
 
    var eventsRouter = new Route({
        id: 'staticRoute',
        path: 'api/v1/events',
        cors: true
    }, function(gw) {
        
        const from = moment(gw.req.query.from);
        const to = moment(gw.req.query.to);

        var filteredData = data;

        if(gw.req.query.from) {
            if(from.isValid()) {
                filteredData = filteredData.filter(event => {
                    return moment(event.datetime).isAfter(from);                
                });
            } else {
                gw.statusCode = 400;
                gw.json({"msg": "La fecha inicio es incorrecta"});
            }
        }
        
        if(gw.req.query.to) {
            if(to.isValid()) {
                filteredData = filteredData.filter(event => {
                    return moment(event.datetime).isBefore(to);                   
                });
            } else {
                gw.statusCode = 400;
                gw.json({"msg": "La fecha fin es incorrecta"});
            }
        }
        
        gw.json(filteredData, {
            deep: 10
        });
    });

    return eventsRouter;
    
}
