const express = require("express");
const route = express.Router();
const { getDetailsController } = require("../controllers/detail");
const { authenticated } = require("../middlewares/authenticate");

//?route -- POST /api/iot/v2.0/detail/get-details
//?@desc -- get details of data coming from the user
//?@access -- private
route.post("/get-details", authenticated, getDetailsController);

module.exports = route;
