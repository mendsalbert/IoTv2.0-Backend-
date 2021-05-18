const express = require("express");
const route = express.Router();
const { addDeviceValidator } = require("../validations/device");
const { runValidation } = require("../validations/index");
const {
  getDeviceController,
  getDevicesController,
  addDeviceController,
  editDeviceController,
  deleteDeviceController,
} = require("../controllers/device");
const { authenticated } = require("../middlewares/authenticate");

//?route -- POST /api/iot/v2.0/device/get-device
//?@desc -- get a device
//?@access -- protected
route.post("/get-device/:id", authenticated, getDeviceController);

//?route -- POST /api/iot/v2.0/device/get-devices
//?@desc -- get all devices
//?@access -- protected
route.get("/get-devices", authenticated, getDevicesController);

//?route -- POST /api/iot/v2.0/device/add-device
//?@desc -- add a device
//?@access -- protected
route.post(
  "/add-device",
  runValidation,
  addDeviceValidator,
  authenticated,
  addDeviceController
);

//?route -- POST /api/iot/v2.0/device/edit-device
//?@desc -- edit a device
//?@access -- protected
route.post(
  "/edit-device/:id",
  runValidation,
  addDeviceValidator,
  authenticated,
  editDeviceController
);

//?route -- POST /api/iot/v2.0/device/delete-device
//?@desc -- delete a device
//?@access -- protected
route.delete("/delete-device/:id", authenticated, deleteDeviceController);

module.exports = route;
