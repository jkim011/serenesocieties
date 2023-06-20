const db = require('../config/connection');
const { User, Product, Category, Stock } = require('../models');
const userData = require('./users.json');
const productData = require('./products.json');
const categoryData = require('./categories.json');
const stockData = require('./stock.json');

db.once('open', async () => {
  try {
    await Product.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({});
    await Stock.deleteMany({});

    await User.create(userData);

    await Product.create(productData);

    await Category.create(categoryData);

    await Stock.create(stockData);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }




  console.log('all done!');
  process.exit(0);
});
