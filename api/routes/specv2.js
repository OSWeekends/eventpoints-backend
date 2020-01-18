module.exports = function() {
  const specRoute = new Route({
    id: 'specv2Path',
    path: 'api/v2/spec/*:path',
    cors: true,
    directory: {
      path: './specv2',
      listing: true,
    },
  });
  return specRoute;
};
