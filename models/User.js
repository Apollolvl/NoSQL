// User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Define your fields for a user
});

const User = mongoose.model('User', userSchema);

module.exports = User;
