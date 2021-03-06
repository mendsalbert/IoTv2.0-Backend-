const express = require("express");
const route = express.Router();
const { signUpController, signInController } = require("../controllers/user");

//?route -- POST /api/iot/v2.0/user/sign-up
//?@desc -- sign user up
//?@access -- public
route.post("/sign-up", signUpController);

//?route -- POST /api/iot/v2.0/user/sign-in
//?@desc -- sign user in
//?@access -- public
route.post("/sign-in", signInController);

module.exports = route;
