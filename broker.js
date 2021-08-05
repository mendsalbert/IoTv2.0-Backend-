const aedes = require("aedes")();
const config = require("config");
const server = require("net").createServer(aedes.handle);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 8080;
const mongoosePort = config.get("mongoURI");
const dbPort = config.get("DB_PORT");
const brokerPort = config.get("BROKER_PORT");
const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.setMaxListeners(0);

//route imports
const deviceRoute = require("./routes/device");
const userRoute = require("./routes/user");
const projectRoute = require("./routes/project");
const detailRoute = require("./routes/detail");

//middleware
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
app.use(cors());
app.use(express.json());

//routes middle-wares
app.get('/home',(req,res)=>{
  res.send('home page')
})
app.use("/api/iot/v2.0/user", userRoute);
app.use("/api/iot/v2.0/project", projectRoute);
app.use("/api/iot/v2.0/device", deviceRoute);
app.use("/api/iot/v2.0/detail", detailRoute);
// database connection
mongoose
  .connect(mongoosePort, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    server.listen(brokerPort, function () {
      const server = app.listen(dbPort);
      const io = require("./socket").init(server);
      io.on("connection", (socket) => {
        // console.log("socket client connected");
      });
      console.log("broker server connected on port:", port);
    });
    console.log("database connected");
  })
  .catch((e) => {
    console.log(e);
  });
