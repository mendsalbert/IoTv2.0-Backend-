const express = require("express");
const route = express.Router();
const {
  getDeviceController,
  getDevicesController,
  addDeviceController,
  editDeviceController,
  deleteDeviceController,
} = require("../controllers/device");

//todo ADD AUTHENTICATION ALL ROUTES
// const { authenticated } = require("../middlewares/auth");

//?route -- POST /api/iot/v2.0/device/get-device
//?@desc -- get a device
//?@access -- protected
route.get("/get-device/:user_id", getDeviceController);

//?route -- POST /api/iot/v2.0/device/get-devices
//?@desc -- get all devices
//?@access -- protected
route.get("/get-devices", getDevicesController);

//?route -- POST /api/iot/v2.0/device/add-device
//?@desc -- add a device
//?@access -- protected
route.post("/add-device", addDeviceController);

//?route -- POST /api/iot/v2.0/device/edit-device
//?@desc -- edit a device
//?@access -- protected
route.post("/edit-device/:id", editDeviceController);

//?route -- POST /api/iot/v2.0/device/delete-device
//?@desc -- delete a device
//?@access -- protected
route.delete("/delete-device/:id", deleteDeviceController);

module.exports = route;
