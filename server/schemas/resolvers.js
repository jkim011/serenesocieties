const { AuthenticationError } = require('apollo-server-express');
const { User, Product } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user){
                return User.findOne({_id: context.user._id})
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        users: async () => {
            return User.find();
        },
        user: async (parent, { username }) => {
            return User.findOne({ username });
        },
        products: async () => {
            return Product.find();
        },
        product: async (parent, { productId }) => {
            return Product.findOne({ _id: productId });
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
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
        addProduct: async (parent, { name, description, image, price, category, size, stock }, context) => {

            const product = await Product.create({ name, description, image, price, category, size, stock });

            return product;

        },
        updateProduct: async (parent, { productId, name, description, image, price, category, size, stock }, context) => {
            return Product.findOneAndUpdate(
                {_id: productId},
                {name, description, image, price, category, size, stock}
            )
        },
        deleteProduct: async (parent, { productId }, context) => {
            
            const product = await Product.findOneAndDelete({
                _id: productId,
            })
            return product;

        }


    }
}

module.exports = resolvers;