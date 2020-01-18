const _ = require('lodash');

module.exports = function(config, goblinDB) {
  const eventsRouter = new Route(
    {
      id: 'event_by_source',
      path: 'api/v2/events/source/*:path',
      cors: true,
    },
    function(gw) {
      const data = goblinDB.get('events');

      if (config.mockupData) {
        gw.json(data, {
          deep: 10,
        });
      } else {
        const items = data.filter(
          item => item.source && item.source.id === gw.params.path
        );
        gw.json(items);
      }
    }
  );

  return eventsRouter;
};
