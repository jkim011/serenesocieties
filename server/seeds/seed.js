const db = require('../config/connection');
const { User, Product, Category, Stock } = require('../models');

db.once('open', async () => {

  await Category.deleteMany();
  const categories = await Category.insertMany([
    {name: "All Products", routeName: "all-products"},
    {name: "Tees", routeName: "tees"},
    {name: "Hoodies", routeName: "hoodies"},
    {name: "Posters", routeName: "posters"},
    {name: "Halloween Special", routeName: "halloween-special"},
    {name: "Summer Special", routeName: "summer-special"}
  ]);
  console.log("categories seeded");

  await Stock.deleteMany();
  const inventory = await Stock.insertMany([
    {size: "S", quantity: 10},
    {size: "M", quantity: 8},
    {size: "L", quantity: 12},
    {size: "M", quantity: 5},
    {size: "L", quantity: 8},
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
      name: "Seeded hoodie",
      image: "../../images/clothes/halloween-hoodie.jpg",
      image2: "../../images/clothes/halloween-hoodie-model.jpg",
      description: "testing seeded data hoodie",
      price: 50.00,
      categories: [categories[2]._id, categories[4]._id],
      inventory: [inventory[3]._id, inventory[4]._id]
    },
    {
      name: "Seeded poster",
      image: "../../images/posters/toxicPalmtree.jpg",
      description: "testing seeded data poster",
      price: 10.00,
      categories: [categories[3]._id],
      inventory: [inventory[5]._id, inventory[6]._id]
    },
    {
      name: "Seeded t-shirt 2",
      image: "../../images/clothes/testShirtBack.jpg",
      image2: "../../images/clothes/testShirtFront.jpg",
      description: "testing seeded data shirt",
      price: 20.00,
      categories: [categories[1]._id],
      inventory: [inventory[0]._id, inventory[1]._id, inventory[2]._id]
    },
    {
      name: "Seeded t-shirt 3",
      image: "../../images/clothes/testShirtBack.jpg",
      image2: "../../images/clothes/testShirtFront.jpg",
      description: "testing seeded data shirt",
      price: 20.00,
      categories: [categories[1]._id],
      inventory: [inventory[0]._id, inventory[1]._id, inventory[2]._id]
    },
    {
      name: "Seeded t-shirt 4",
      image: "../../images/clothes/testShirtBack.jpg",
      image2: "../../images/clothes/testShirtFront.jpg",
      description: "testing seeded data shirt",
      price: 20.00,
      categories: [categories[1]._id, categories[4]._id],
      inventory: [inventory[0]._id, inventory[1]._id, inventory[2]._id]
    },
    {
      name: "Seeded poster 2",
      image: "../../images/posters/toxicPalmtree.jpg",
      description: "testing seeded data poster",
      price: 10.00,
      categories: [categories[3]._id],
      inventory: [inventory[5]._id, inventory[6]._id]
    },
    {
      name: "Seeded poster 3",
      image: "../../images/posters/toxicPalmtree.jpg",
      description: "testing seeded data poster",
      price: 10.00,
      categories: [categories[3]._id, categories[4]._id],
      inventory: [inventory[5]._id, inventory[6]._id]
    },
    {
      name: "Seeded t-shirt summer ",
      image: "../../images/clothes/testShirtBack.jpg",
      image2: "../../images/clothes/testShirtFront.jpg",
      description: "testing seeded data shirt",
      price: 20.00,
      categories: [categories[1]._id, categories[5]._id],
      inventory: [inventory[0]._id, inventory[1]._id, inventory[2]._id]
    },
    {
      name: "Seeded hoodie summer",
      image: "../../images/clothes/halloween-hoodie.jpg",
      image2: "../../images/clothes/halloween-hoodie-model.jpg",
      description: "testing seeded data hoodie",
      price: 50.00,
      categories: [categories[2]._id, categories[5]._id],
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
