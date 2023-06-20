const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  routeName: {
    type: String,
    required: true,
    trim: true
  }
  // isCollection: {
  //   type: Boolean,
    
  // }
});

const Category = model('Category', categorySchema);

module.exports = Category;