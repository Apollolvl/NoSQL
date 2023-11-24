// Thought.js
const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  // Define your fields for a thought
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
