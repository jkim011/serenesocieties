const db = require('../config/connection');
const { User, Product, Category, Cart } = require('../models');

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
  
  await Product.deleteMany();
  const products = await Product.insertMany([
    {
      name: "Seeded t-shirt",
      image: "../../images/clothes/testShirtBack.jpg",
      image2: "../../images/clothes/testShirtFront.jpg",
      description: "testing seeded data shirt",
      price: 20.00,
      categories: [categories[1]._id],
      inventory: [
        {
          size: "Small",
          quantity: 10,
          priceId: "price_1NTqMAGsTkNkjE8Ul9sJek5Y"
        },
        {
          size: "Medium",
          quantity: 15,
          priceId: "price_1Nvn4HGsTkNkjE8UJJfaw8nJ"
        },
        {
          size: "Large",
          quantity: 5,
          priceId: "price_1Nvn59GsTkNkjE8UJ3mddxaf"
        }
      ]
    },
    {
      name: "Seeded hoodie",
      image: "../../images/clothes/halloween-hoodie.jpg",
      image2: "../../images/clothes/halloween-hoodie-model.jpg",
      description: "testing seeded data hoodie",
      price: 50.00,
      categories: [categories[2]._id, categories[4]._id],
      inventory: [
        {
          size: "Small",
          quantity: 12,
          priceId: "price_1NpxMGGsTkNkjE8UwaptAEQK"
        },
        {
          size: "Medium",
          quantity: 13,
          priceId: "price_1NpxhsGsTkNkjE8UmrSKV7P2"
        },
        {
          size: "Large",
          quantity: 8,
          priceId: "price_1NvnGpGsTkNkjE8UPsaaqvRH"
        }
      ]
    },
    {
      name: "Seeded poster",
      image: "../../images/posters/toxicPalmtree.jpg",
      image2: "../../images/posters/toxicPalmtree.jpg",
      description: "testing seeded data poster",
      price: 10.00,
      categories: [categories[3]._id],
      inventory: [
        {
          size: "10x12",
          quantity: 10,
          priceId: "price_1NrlevGsTkNkjE8USOBX5FGC"
        },
        {
          size: "13x16",
          quantity: 18,
          priceId: "price_1NvnHwGsTkNkjE8UrUb0M8Qf"
        }
      ]
    }    
  ]);
  console.log("products seeded");


  await User.deleteMany();
  await User.create({
    firstName: "Admin",
    lastName: "Admin",
    email: "admin@gmail.com",
    password: "password",
    isAdmin: true
  });
  await User.create({
    firstName: "Person",
    lastName: "Dude",
    email: "person@gmail.com",
    password: "password",
    isAdmin: false,
  });
  console.log("users seeded")


  process.exit();
});
