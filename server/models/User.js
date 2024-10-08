const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  cartItems:[ 
    {
      cartProductId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      cartProductName: {
        type: String,
      },
      cartProductSizeId: {
        type: String,
        // required: true
      },
      cartProductSize: {
        type: String,
      },
      cartProductImage: {
        type: String
      },
      cartProductPrice: {
        type: Number
      },
      cartProductPriceId: {
        type: String
      },
      cartProductQuantity: {
        type: Number,
        default: 1
      }
    } 
  ], 
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
