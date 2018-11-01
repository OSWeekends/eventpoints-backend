module.exports = function(data) {
 
    var eventsRouter = new Route({
        id: 'staticRoute',
        path: 'api/v1/events',
        cors: true
    }, function(gw) {
        const from = gw.req.query.from;
        const to = gw.req.query.to;

        var filteredData = data;

        if(from) {
            console.log("From: " + from);
            filteredData = filteredData.filter(event => {
                return new Date(event.date) >= new Date(from);                
            });
        }
        
        if(to) {
            console.log("To: " + to);
            filteredData = filteredData.filter(event => {
                return new Date(event.date) <= new Date(to);                
            });
        }
        
        gw.json(filteredData, {
            deep: 10
        });
    });

    return eventsRouter;
    
}
