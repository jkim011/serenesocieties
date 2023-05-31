const { gql } = require("apollo-server-express");

const typeDefs = gql`
    
    type Product {
        _id: ID
        name: String!
        price: Int!
        category: String!
        size: String!
        description: String!
    }

    type User{
        _id: ID
        username: String!
        email: String!
        password: String!
        isAdmin: Boolean!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query{
        me: User
        products: [Product]
        product(productId: ID!): Product
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addProduct(name: String!, price: Int!, category: String!, size: String!, description: String!): Product
        updateProduct(name: String, price: Int, category: String, size: String, description: String): Product
        deleteProduct(_id: ID!): Product
    }

`;

module.exports = typeDefs;