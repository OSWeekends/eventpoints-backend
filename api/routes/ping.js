module.exports = function(routePath, message) {
  const indexRouter = new Route(
    {
      id: 'staticRoute',
      path: routePath,
      cors: true,
    },
    function(gw) {
      gw.json({ message: `EventPoints API ${message}` });
    }
  );
  return indexRouter;
};
