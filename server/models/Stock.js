const { Schema, model } = require('mongoose');

const stockSchema = new Schema({
  size: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  }
});

const Stock = model('Stock', stockSchema);

module.exports = Stock;