module.exports = function() {
  const specRoute = new Route({
    id: 'specv1Path',
    path: 'api/v1/spec/*:path',
    cors: true,
    directory: {
      path: './spec',
      listing: true,
    },
  });
  return specRoute;
};
