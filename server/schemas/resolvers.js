const { AuthenticationError } = require('apollo-server-express');
const { User, Project } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user){
                return User.findOne({_id: context.user._id})
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },
    users: async () => {
        return User.find();
      },
}

module.exports = resolvers;