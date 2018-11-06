module.exports = function() {
 
    var specRoute = new Route({
        id: 'spectPath',
        path: 'api/v1/spec/*:path',
        cors: true,
        directory: {
            path: './spec',
            listing: true
        }
    });
    return specRoute;
    
}