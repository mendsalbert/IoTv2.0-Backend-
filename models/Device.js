const mongoose = require("mongoose");
const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  project_id: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  mqttId: {
    type: String,
    required: true,
  },
  mqttPassword: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Device", deviceSchema);
