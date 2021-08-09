const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://https://iotdevlab.herokuapp.com:2356");
// const client = mqtt.connect("mqtt://localhost:8080");
const project = require("../helper/project");
const Detail = require("../models/Detail");
const dateFormat = require("dateformat");
const io = require("../socket");
exports.getDetailsController = async (req, res) => {
  client.setMaxListeners(0);
  //?subscribe
  let user_id = req.user.id;
  let topic = await project.getProjectTopic(user_id);
  client.subscribe(topic, (err) => {
    // err ? console.log(err) : console.log("subscribed on topic " + topic);
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
      const time = dateFormat(now, "dddd,H:MM:ss TT");
      const date = dateFormat(now, "dd-mm-yy ");
      const detail = new Detail({
        topic: t,
        time: time,
        date: date,
        data: m,
      });
      detail.save((err, data) => {
        if (err) {
          console.log(err);
        }
      });
      // console.log(message.toString());
    } else {
      console.log("something went wrong in inserting data into database");
    }
  });
};

exports.downloadDataController = async (req, res) => {
  try {
    /**
     * download data based on topic
     * give user chance to select from days or weeks to download
     * eg 1 day , 7 days , 3 week(21days) , 1 month, or enter own date
     */
    //! This must be tested very well
    let topic, days, date, today, last, endDate, details;
    topic = req.params.topic;
    days = req.params.days;
    date = new Date();
    today = dateFormat(date, "dd-mm-yy ");
    last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
    endDate = dateFormat(last, "dd-mm-yy ");
    details = await Detail.find({
      topic: topic,
      date: {
        $gte: today,
        $lte: endDate,
      },
    }).limit(20);
    res.json({ details });
  } catch (error) {
    res.json({ error });
  }
};
