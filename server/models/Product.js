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
  categories: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
  ],
  inventory: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Stock',
        required: true
    }
  ],

});

const Product = model('Product', productSchema);

module.exports = Product;
