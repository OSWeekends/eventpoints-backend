module.exports = function(data) {
 
    var eventsRouter = new Route({
        id: 'staticRoute',
        path: 'api/v1/events',
        cors: true
    }, function(gw) {
        
        const from = new Date(gw.req.query.from);
        const to = new Date(gw.req.query.to);

        var filteredData = data;

        if(!isNaN(from.getTime())) {
            filteredData = filteredData.filter(event => {
                return new Date(event.date) >= from;                
            });
        } else {
            console.log("La fecha inicio es incorrecta");
        }
        
        if(!isNaN(to.getTime())) {
            filteredData = filteredData.filter(event => {
                return new Date(event.date) <= to;                
            });
        } else {
            console.log("La fecha fin es incorrecta");
        }
        
        gw.json(filteredData, {
            deep: 10
        });
    });

    return eventsRouter;
    
}
