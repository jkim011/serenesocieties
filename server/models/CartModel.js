const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
  cartProduct: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  cartProductSize: {
    type: String,
    required: true
  }

});

const Cart = model('Cart', cartSchema);

module.exports = Cart;