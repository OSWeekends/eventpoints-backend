const events = require("./events.json")

function sendEvents(callback) {
  return callback(null, {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(events)
  })
}

function findAndSendEvent(callback, id) {
  const found = events.find(event => id === event.id),
    statusCode = found ? 200 : 404,
    response = found
      ? found
      : `Not Found, try this https://eventpoints.baulen.com/api/v1/events/${
          events[0].id
        }`
  return callback(null, {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response)
  })
}

exports.handler = function(event, context, callback) {
  const lastPartOfPath = event.path.split("/").pop()

  if ("events" === lastPartOfPath) {
    return sendEvents(callback)
  } else {
    return findAndSendEvent(callback, lastPartOfPath)
  }
}
