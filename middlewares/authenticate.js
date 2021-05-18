const jwt = require("jsonwebtoken");
const config = require("config");

exports.authenticated = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    const error = new Error("Not authenticated.");
    throw error;
    // return res.status(401).json({ msg: "No token available, authorization failed" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

//front end You wanna login
//1. First store the token inside the browser
//2. thats it.

//for protected routes
//compare the token inside the browser with the secret( by passing the token as an "x-auth-token using axios")
