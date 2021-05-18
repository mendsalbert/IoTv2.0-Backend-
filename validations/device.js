const { check } = require("express-validator");

exports.addDeviceValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("purpose")
    .not()
    .isEmpty()
    .withMessage("purpose of the device is required"),
];
