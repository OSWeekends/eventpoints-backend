const moment = require('moment');

module.exports = function(config, goblinDB) {
  const eventsRouter = new Route(
    {
      id: 'event_by_source',
      path: 'api/v2/events/source/*:path',
      cors: true,
    },
    function(gw) {
      const fromValue = gw.req.query.from;
      const toValue = gw.req.query.to;

      const rawData = goblinDB.get('events');
      let filteredData = rawData.filter(
        item => item.source && item.source.id === gw.params.path
      );
      if (fromValue) {
        const from = moment(fromValue).isValid()
          ? moment(fromValue)
          : moment(fromValue, 'x');
        if (from.isValid()) {
          filteredData = filteredData.filter(event =>
            moment(event.datetime).isAfter(from)
          );
        } else {
          gw.statusCode = 400;
          gw.json({ msg: 'La fecha inicio es incorrecta' });
        }
      }

      if (toValue) {
        const to = moment(toValue).isValid()
          ? moment(toValue)
          : moment(toValue, 'x');
        if (to.isValid()) {
          filteredData = filteredData.filter(event =>
            moment(event.datetime).isBefore(to)
          );
        } else {
          gw.statusCode = 400;
          gw.json({ msg: 'La fecha fin es incorrecta' });
        }
      }

      // Si no pasamos fechas de inicio, se devuelve todos los eventos a futuro
      if (!fromValue && !toValue) {
        filteredData = filteredData.filter(event =>
          moment(event.datetime).isSameOrAfter()
        );
      }

      if (config.mockupData) {
        gw.json([], {
          deep: 10,
        });
      } else {
        gw.json(filteredData, {
          deep: 10,
        });
      }
    }
  );

  return eventsRouter;
};
