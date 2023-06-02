const db = require('../config/connection');
const { User, Product } = require('../models');
const userData = require('./users.json');
const productData = require('./products.json');

db.once('open', async () => {
  try {
    await Product.deleteMany({});
    await User.deleteMany({});

    await User.create(userData);
    console.log("users made")

    await Product.create(productData);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
