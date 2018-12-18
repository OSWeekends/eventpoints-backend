const moment = require('moment');

module.exports = function(goblinDB) {
 
    var eventsRouter = new Route({
        id: 'events',
        path: 'api/v1/events',
        cors: true
    }, function(gw) {
        
        const fromValue = gw.req.query.from;
        const toValue = gw.req.query.to;

        var filteredData = goblinDB.get("events");

        if(fromValue) {

            const from = moment(fromValue).isValid() ? moment(fromValue) : moment(fromValue, "x");
            if(from.isValid()) {
                filteredData = filteredData.filter(event => {
                    return moment(event.datetime).isAfter(from);                
                });
            } else {
                gw.statusCode = 400;
                gw.json({"msg": "La fecha inicio es incorrecta"});
            }            
        } 
        
        if(toValue) {
            const to = moment(toValue).isValid() ? moment(toValue) : moment(toValue, "x");
            if(to.isValid()) {
                filteredData = filteredData.filter(event => {
                    return moment(event.datetime).isBefore(to);                   
                });
            } else {
                gw.statusCode = 400;
                gw.json({"msg": "La fecha fin es incorrecta"});
            }
        } 

        if(!fromValue && !toValue) {
            filteredData = filteredData.filter(event => {
                return moment(event.datetime).isSameOrAfter();                   
            });
        }
        
        gw.json(filteredData, {
            deep: 10
        });
    });

    return eventsRouter;
    
}
