const db = require('../config/connection');
const { User, Product, Category, Cart } = require('../models');

db.once('open', async () => {

  await Category.deleteMany();
  const categories = await Category.insertMany([
    {name: "All Products", routeName: "all-products", isCollection: false},
    {name: "Tees", routeName: "tees", isCollection: false},
    {name: "Hoodies", routeName: "hoodies", isCollection: false},
    {name: "Posters", routeName: "posters", isCollection: false},
    {name: "Natural Essence", routeName: "natural-essence", isCollection: true},
    {name: "Halloween Special", routeName: "halloween-special", isCollection: true}
  ]);
  console.log("categories seeded");
  
  await Product.deleteMany();
  const products = await Product.insertMany([
    {
      name: "Praise Tee",
      image: "../../images/clothes/Praise_Shirt_Back.jpg",
      image2: "../../images/clothes/Praise_Shirt_Front.jpg",
      description: "testing seeded data shirt",
      price: 19.99,
      categories: [categories[1]._id, categories[4]._id],
      inventory: [
        {
          size: "S",
          quantity: 10,
          priceId: "price_1NTqMAGsTkNkjE8Ul9sJek5Y"
        },
        {
          size: "M",
          quantity: 15,
          priceId: "price_1Nvn4HGsTkNkjE8UJJfaw8nJ"
        },
        {
          size: "L",
          quantity: 0,
          priceId: "price_1Nvn59GsTkNkjE8UJ3mddxaf"
        },
        {
          size: "XL",
          quantity: 4,
          priceId: "price_1PJiFjGsTkNkjE8UAFdMuNU8"
        }
      ]
    },
    {
      name: "Peace and Quiet Tee",
      image: "../../images/clothes/PeaceAndQuiet_Shirt_Back.jpg",
      image2: "../../images/clothes/PeaceAndQuiet_Shirt_Front.jpg",
      description: "testing seeded data shirt",
      price: 19.99,
      categories: [categories[1]._id, categories[4]._id],
      inventory: [
        {
          size: "S",
          quantity: 0,
          priceId: "price_1PPfdXGsTkNkjE8UkZMlPXoo"
        },
        {
          size: "M",
          quantity: 9,
          priceId: "price_1PPfeAGsTkNkjE8Uq5j3agks"
        },
        {
          size: "L",
          quantity: 10,
          priceId: "price_1PPfeWGsTkNkjE8U8HOKtjNq"
        },
        {
          size: "XL",
          quantity: 2,
          priceId: "price_1PPfeiGsTkNkjE8Ug2jSomqT"
        }
      ]
    },
    {
      name: "Flaming Flower Tee",
      image: "../../images/clothes/FlamingFlower_Shirt_Back.jpg",
      image2: "../../images/clothes/FlamingFlower_Shirt_Front.jpg",
      description: "testing seeded data shirt",
      price: 19.99,
      categories: [categories[1]._id, categories[4]._id],
      inventory: [
        {
          size: "S",
          quantity: 5,
          priceId: "price_1PPfgOGsTkNkjE8UWwh3pziB"
        },
        {
          size: "M",
          quantity: 10,
          priceId: "price_1PPfgdGsTkNkjE8U37DoK1CX"
        },
        {
          size: "L",
          quantity: 9,
          priceId: "price_1PPfh1GsTkNkjE8UfpdzoU1r"
        },
        {
          size: "XL",
          quantity: 4,
          priceId: "price_1PPfhEGsTkNkjE8UlwaJ6Kdf"
        }
      ]
    },
    {
      name: "Box Tee",
      image: "../../images/clothes/Schmeat_Shirt_Front.jpg",
      image2: "../../images/clothes/Schmeat_Shirt_Front.jpg",
      description: "testing seeded data shirt",
      price: 19.99,
      categories: [categories[1]._id, categories[4]._id],
      inventory: [
        {
          size: "S",
          quantity: 8,
          priceId: "price_1PPfljGsTkNkjE8U9ccdNznR"
        },
        {
          size: "M",
          quantity: 11,
          priceId: "price_1PPflxGsTkNkjE8UqDUyd8MC"
        },
        {
          size: "L",
          quantity: 12,
          priceId: "price_1PPfmGGsTkNkjE8Us4HwdDSE"
        },
        {
          size: "XL",
          quantity: 6,
          priceId: "price_1PPfmPGsTkNkjE8UkKzUiwBk"
        }
      ]
    },
    {
      name: "Ghosties Hoodie",
      image: "../../images/clothes/Ghosties_Hoodie.jpg",
      image2: "../../images/clothes/halloween-hoodie-model.jpg",
      description: "testing seeded data hoodie",
      price: 50.00,
      categories: [categories[2]._id, categories[5]._id],
      inventory: [
        {
          size: "S",
          quantity: 0,
          priceId: "price_1NpxMGGsTkNkjE8UwaptAEQK"
        },
        {
          size: "M",
          quantity: 13,
          priceId: "price_1NpxhsGsTkNkjE8UmrSKV7P2"
        },
        {
          size: "L",
          quantity: 8,
          priceId: "price_1NvnGpGsTkNkjE8UPsaaqvRH"
        },
        {
          size: "XL",
          quantity: 8,
          priceId: "price_1PJiGpGsTkNkjE8UvIMSX5Ca"
        }
      ]
    },
    {
      name: "Testing Hoodie",
      image: "../../images/clothes/Ghosties_Hoodie.jpg",
      image2: "../../images/clothes/halloween-hoodie-model.jpg",
      description: "testing seeded data hoodie pt 2",
      price: 50.00,
      categories: [categories[2]._id],
      inventory: [
        {
          size: "S",
          quantity: 2,
          priceId: "price_1PZKg6GsTkNkjE8UjwuN8WgB"
        },
        {
          size: "M",
          quantity: 9,
          priceId: "price_1PZKkoGsTkNkjE8Uv9wj7Z1R"
        },
        {
          size: "L",
          quantity: 7,
          priceId: "price_1PZKlBGsTkNkjE8UXwbito5S"
        },
        {
          size: "XL",
          quantity: 0,
          priceId: "price_1PZKlTGsTkNkjE8UMLKe1kW2"
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
