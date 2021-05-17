const config = require("config");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const db = config.get("mongoURI");
const port = config.get("BROKER_PORT");
//middleware
app.use(cors());

//routes

// database connection
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    const server = app.listen(port);
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      // console.log("socket client connected");
    });
    console.log("database connected");
  })
  .catch((e) => {
    console.log(e);
  });
