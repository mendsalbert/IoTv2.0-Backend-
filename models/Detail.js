const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  topic: {
    type: String,
    trim: true,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Detail", userSchema);
