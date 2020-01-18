module.exports = function(data) {
  const sourcesRouter = new Route(
    {
      id: 'staticRoute',
      path: 'api/v1/sources',
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
