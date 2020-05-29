const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  name: String,
});


module.exports = mongoose.model('Word', wordSchema);
