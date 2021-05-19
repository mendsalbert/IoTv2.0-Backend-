const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost:8080");

client.on("connect", () => {
  client.subscribe("eco");
});

client.on("message", (t, m) => {
  console.log(m.toString());
});
