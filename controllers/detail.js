const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost:8080");
const project = require("../helper/project");
const Detail = require("../models/Detail");
const dateFormat = require("dateformat");
const io = require("../socket");

exports.getDetailsController = async (req, res) => {
  //?subscribe
  let user_id = req.user.id;
  let topic = await project.getProjectTopic(user_id);
  client.subscribe(topic, (err) => {
    err ? console.log(err) : console.log("subscribed on topic " + topic);
  });

  //?display at the front end
  client.on("message", (t, message) => {
    if (topic === t) {
      var messages = message.toString();
      var m = JSON.parse(messages);
      io.getIO().emit(topic, { message: m });
    } else {
      console.log(
        "Please make sure the publishing and subscribing topic are equal"
      );
    }
  });

  //?save in DB
  client.on("message", (t, message) => {
    if (topic === t) {
      var messages = message.toString();
      var m = JSON.parse(messages);
      /*
      todo
      *create a detail collection
      *insert the topic
      *insert date
      *insert all data coming from the sensor
      ?FIND A WAY OF INSERTING DEVICE ID INTO THE DETAIL DB
      */
      const now = new Date();
      const newDate = dateFormat(now, "dddd,H:MM:ss TT");
      const detail = new Detail({
        topic: t,
        time: newDate,
        data: m,
      });
      detail.save((err, data) => {
        if (err) {
          console.log(err);
        }
      });
      console.log(message.toString());
    } else {
      console.log("something went wrong in inserting data into database");
    }
  });
};
