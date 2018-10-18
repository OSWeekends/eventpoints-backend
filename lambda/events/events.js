const events = require("./events.json")

exports.handler = function(event, context, callback) {
  const response = "/events" === event.path ? events : events[2]

  callback(null, {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response)
  })
}
