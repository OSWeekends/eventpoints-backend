module.exports = function() {
 
    var sourcesRouter = new Route({
        id: 'staticRoute',
        path: 'api/v1/sources',
        cors: true
    }, function(gw) {
        var data = [
            {
                "name": "Meetup",
                "logo": "https://secure.meetupstatic.com/s/img/5455565085016210254/logo/svg/logo--script.svg",
                "url": "https://www.meetup.com/es-ES/"
            }
        ];
        gw.json(data, {
            deep: 10
        });
    });

    return sourcesRouter;
    
}