const aedes = require("aedes")();
const config = require("config");
const server = require("net").createServer(aedes.handle);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require('dotenv').config()
const mongoosePort = config.get("mongoURI");
const dbPort = process.env.PORT || 5000;
const brokerPort = 2356;
// const brokerPort = process.env.PORT || 8080;

//route imports
const deviceRoute = require("./routes/device");
const userRoute = require("./routes/user");
const projectRoute = require("./routes/project");
const detailRoute = require("./routes/detail");

app.use(cors());
app.use(express.json());

//routes middle-wares
app.get('/home',(req,res)=>{
  res.send('home page')
})
 app.get('/',(req,res)=>{
   res.send('main home page')
 })
app.use("/api/iot/v2.0/user", userRoute);
app.use("/api/iot/v2.0/project", projectRoute);
app.use("/api/iot/v2.0/device", deviceRoute);
app.use("/api/iot/v2.0/detail", detailRoute);
// database connection
mongoose
  .connect('mongodb+srv://iot:tuu87aRD7fQZDUr@cluster0.5286h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    server.listen(brokerPort, function () {
       console.log('broker')
       const server = app.listen(dbPort);
       const io = require('./socket').init(server);
       io.on('connection', socket => {
         console.log('Client connected');
       });
    });
    app.listen(dbPort,function(){
      console.log('listening to my port');
    })
   
    console.log("database connected");
  })
  .catch((e) => {
    console.log(e);
  });


// const express = require('express');
// const app = express();

// app.get('/home',(req,res)=>{
//   res.send('home page')
// })
//  app.get('/',(req,res)=>{
//    res.send('main home page')
//  })

// const port = process.env.PORT || 5000;
// app.listen(port,function(){
//   console.log('listening to my port');
// })
