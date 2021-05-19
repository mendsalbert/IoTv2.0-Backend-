const express = require("express");
const route = express.Router();
const {
  getDetailsController,
  downloadDataController,
} = require("../controllers/detail");
const { authenticated } = require("../middlewares/authenticate");

//?route -- POST /api/iot/v2.0/detail/get-details
//?@desc -- get details of data coming from the user
//?@access -- private
route.post("/get-details", authenticated, getDetailsController);

//?route -- POST /api/iot/v2.0/detail/download-data
//?@desc -- download data coming from sensors (devices)
//?@access -- private
route.post(
  "/download-data/:topic/:days",
  authenticated,
  downloadDataController
);

module.exports = route;
