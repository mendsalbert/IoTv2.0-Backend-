var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt:https://iotdevlab.herokuapp.com');
// console.log('fake connected')
client.on('connect', function () {
    console.log('connected');
//   client.subscribe('presence');
//   client.publish('presence', 'Hello mqtt');
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});