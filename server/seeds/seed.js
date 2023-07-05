const db = require('../config/connection');
const { User, Product, Category, Stock } = require('../models');

db.once('open', async () => {

  await Category.deleteMany();
  const categories = await Category.insertMany([
    {name: "All Products", routeName: "all-products"},
    {name: "Tees", routeName: "tees"},
    {name: "Posters", routeName: "posters"}
  ]);
  console.log("categories seeded");

  await Stock.deleteMany();
  const inventory = await Stock.insertMany([
    {size: "S", quantity: 10},
    {size: "M", quantity: 8},
    {size: "L", quantity: 12},
    {size: "10x12 in", quantity: 15},
    {size: "13x15 in", quantity: 8}
  ]);
  console.log("inventory seeded")

  await Product.deleteMany();
  const products = await Product.insertMany([
    {
      name: "Seeded t-shirt",
      image: "../../images/clothes/testShirtBack.jpg",
      image2: "../../images/clothes/testShirtFront.jpg",
      description: "testing seeded data shirt",
      price: 20.00,
      categories: [categories[1]._id],
      inventory: [inventory[0]._id, inventory[1]._id, inventory[2]._id]
    },
    {
      name: "Seeded poster",
      image: "../../images/posters/toxicPalmtree.jpg",
      description: "testing seeded data poster",
      price: 10.00,
      categories: [categories[2]._id],
      inventory: [inventory[3]._id, inventory[4]._id]
    }
  ]);
  console.log("products seeded");

  await User.deleteMany();
  await User.create({
    username: "admin",
    email: "admin@gmail.com",
    password: "password",
    isAdmin: true
  });
  await User.create({
    username: "person",
    email: "person@gmail.com",
    password: "password",
    isAdmin: false
  });
  console.log("users seeded")

  process.exit();
});
