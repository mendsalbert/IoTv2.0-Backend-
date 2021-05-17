const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost:5000");

const topic_val = "temp";

client.on("connect", () => {
  client.publish(topic_val, "message");
});

console.log("file running");

client.on("connect", () => {
  client.subscribe(topic_val);
});

client.on("message", (topic, message) => {
  const messages = message.toString();
  console.log(messages);
});
