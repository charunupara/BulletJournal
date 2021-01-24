const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  irrelevant: {
    type: Boolean,
    required: true,
    default: false
  },
  category: {
    type: String,
    default: "event",
    immutable: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("Events", EventSchema);