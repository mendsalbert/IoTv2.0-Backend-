const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const mqtt = require("mqtt");

exports.signUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      res
        .status(400)
        .json({ msg: " A user already exist with this particular email" });
    }
    user = new User({
      name,
      email,
      password,
    });
    let salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);
    const savedUser = await user.save();
    const payLoad = {
      user: {
        id: user._id,
      },
    };
    jwt.sign(
      payLoad,
      config.get("jwtSecret"),
      // {expiresIn: 360000},
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
    // res.status(200).json({ user: savedUser });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

exports.signInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "A user with this email do not exist" });
    }
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Password or email is incorrect" });
      }
    }

    const payLoad = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payLoad,
      config.get("jwtSecret"),
      //   { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
    return;
  } catch (error) {
    res.status(500).json({ msg: error });
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return error;
  }
};
