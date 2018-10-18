const events = require("./events.json")

exports.handler = function(event, context, callback) {
  const lastPartOfPath = event.path.split("/").pop(),
    response = "events" === lastPartOfPath ? events : events[2]

  callback(null, {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response)
  })
}
