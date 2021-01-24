const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  irrelevant: {
    type: Boolean,
    required: true,
    default: false
  },
  category: {
    type: String,
    default: "note",
    immutable: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("Notes", NoteSchema);