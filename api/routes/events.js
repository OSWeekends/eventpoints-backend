const moment = require('moment');

module.exports = function(config, goblinDB) {
  const eventsRouter = new Route(
    {
      id: 'events',
      path: 'api/v1/events',
      cors: true,
    },
    function(gw) {
      const fromValue = gw.req.query.from;
      const toValue = gw.req.query.to;

      let filteredData = goblinDB.get('events');

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
        gw.json(goblinDB.get('events'), {
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
