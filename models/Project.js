const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Project", projectSchema);
