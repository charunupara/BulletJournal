const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: "false"
  },
  irrelevant: {
    type: Boolean,
    required: true,
    default: "false"
  },
  category: {
    type: String,
    default: "task",
    immutable: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);