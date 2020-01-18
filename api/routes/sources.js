module.exports = function(data, routePath) {
  const sourcesRouter = new Route(
    {
      id: 'staticRoute',
      path: routePath,
      cors: true,
    },
    function(gw) {
      gw.json(data, {
        deep: 10,
      });
    }
  );

  return sourcesRouter;
};
