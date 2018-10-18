import events from "./events.json"
console.log(events)
exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: events
  })
}
