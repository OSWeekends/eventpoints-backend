const _ = require('lodash');

module.exports = function(config, goblinDB) {
  const eventsRouter = new Route(
    {
      id: 'event_by_id',
      path: 'api/v1/events/*:path',
      cors: true,
    },
    function(gw) {
      const data = goblinDB.get('events');

      if (config.mockupData) {
        item = data[0];
        item.id = gw.params.path;
        gw.json(item);
      } else {
        const item = _.find(data, { id: gw.params.path });

        if (!item) {
          gw.statusCode = 404;
          gw.json({});
        } else {
          gw.json(item);
        }
      }
    }
  );

  return eventsRouter;
};
