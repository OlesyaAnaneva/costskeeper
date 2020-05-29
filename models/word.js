const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  name:
  {
    type: String,
    required: true,
  },
  price:
  {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});


module.exports = mongoose.model('Word', wordSchema);
