const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    // required: true,
  },
  image2: {
    type: String,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  size: {
    type: String,
    trim: true,
  },
  stock: {
    type: Number,
    required: true
  }
});

const Product = model('Product', productSchema);

module.exports = Product;
