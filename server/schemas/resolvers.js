const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Stock, Cart } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user){
                return User.findOne({_id: context.user._id}).populate("cartItems");
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        users: async () => {
            return User.find().populate("cartItems");
        },
        user: async (parent, { email }) => {
            return User.findOne({ email }).populate("cartItems");
        },
        products: async (parent, {categoryId, categories, name}) => {
            const params = categories ? {categories} : {}
            return Product.find(params).populate("inventory").populate("categories");
            // return Product.find({ _id: categoryId }).populate("inventory").populate("categories");
        },
        product: async (parent, { productId }) => {
            return Product.findOne({ _id: productId }).populate("inventory").populate("categories");
        },
        cartProducts: async(parent, {cartItems})=>{
            return Product.find({_id: cartId}).populate("inventory").populate("categories");
        },
        // productSize: async (parent, { productId, stockId }) => {
        //     // const productsize = inventory[0]
        //     return Product.findOne({ _id: productId, stockId: stockId }).populate('inventory');
        // },
        categories: async () => {
            return await Category.find() //.populate("products");
        },
        category: async (parent, { categoryId }) => {
            return await Category.findOne({ _id: categoryId }).populate("products").populate("product");
        },
        // inventory: async () => {
        //     return await Stock.find().populate('product');
        // },
        // stock: async () => {
        //     return await Stock.findOne({ _id: stockId })
        // }
    },

    Mutation: {
        addUser: async (parent, { firstName, lastName, email, password }) => {
            const user = await User.create({ firstName, lastName, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
        const user = await User.findOne({ email }); 
    
        if (!user) {
            throw new AuthenticationError('No user found with this email address');
        }
    
        const correctPw = await user.isCorrectPassword(password);
    
        if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials!');
        }
    
        const token = signToken(user);
    
        return { token, user };
        },
        addProduct: async (parent, { name, description, image, image2, price, categories }, context) => {

            const product = await Product.create({ name, description, image, image2, price, categories });

            return product;

        },
        updateProduct: async (parent, { productId, name, description, image, image2, price, categories }, context) => {
            return Product.findOneAndUpdate(
                { _id: productId },
                { name, description, image, image2, price, categories }
            )
        },
        deleteProduct: async (parent, { productId }, context) => {
            
            const product = await Product.findOneAndDelete({
                _id: productId,
            })
            return product;

        },
        addStock: async (parent, { productId, size, quantity }) => {
            
            const stock = await Stock.create({ size, quantity })
            await Product.findOneAndUpdate(
              { _id: productId },
              { $addToSet: { inventory: {_id: stock._id} } }
            )
            return [stock];

        },
        updateStock: async (parent, { stockId, size, quantity }) => {

            return Stock.findOneAndUpdate(
                { _id: stockId },
                { size, quantity }
            )
            
        },
        deleteStock: async (parent, { stockId }, context) => {

            const stock = await Stock.findOneAndDelete({
                _id: stockId,
            })
            return stock;

        },
        addCategory: async (parent, { name, routeName }, context) => {
            const category = await Category.create({ name, routeName });
            return category;
        },
        updateCategory: async (parent, { categoryId, name, routeName }, context) => {
            return Category.findOneAndUpdate(
                { _id: categoryId},
                { name, routeName }
            )
        },
        addToCart: async (parent, { userId, cartProductId, cartProductName, cartProductSizeId, cartProductSize, cartProductImage, cartProductPrice }, context) => {
            const cart = await User.findOneAndUpdate(
                {_id: userId},
                {
                  $addToSet: 
                    { 
                      cartItems: { cartProductId, cartProductName, cartProductSizeId, cartProductSize, cartProductImage, cartProductPrice } 
                    } 
                },
            )
            return cart
        },
        removeFromCart: async (parent, { userId, cartId }, context) => {
            const cart = await User.findOneAndUpdate(
                { _id: userId },
                {
                  $pull: {
                    cartItems: {_id: cartId}
                  }
                }
            )
            return cart
        }

    }
}

module.exports = resolvers;