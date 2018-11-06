module.exports = function(data) {
 
    var eventsRouter = new Route({
        id: 'staticRoute',
        path: 'api/v1/events',
        cors: true
    }, function(gw) {
        
        const from = new Date(gw.req.query.from);
        const to = new Date(gw.req.query.to);

        var filteredData = data;

        if(gw.req.query.from) {
            if(!isNaN(from.getTime())) {
                filteredData = filteredData.filter(event => {
                    return new Date(event.date) >= from;                
                });
            } else {
                gw.statusCode = 400;
                gw.json({"msg": "La fecha inicio es incorrecta"});
            }
        }
        
        if(gw.req.query.to) {
            if(!isNaN(to.getTime())) {
                filteredData = filteredData.filter(event => {
                    return new Date(event.date) <= to;                
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
