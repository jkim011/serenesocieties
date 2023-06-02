const { gql } = require("apollo-server-express");

const typeDefs = gql`
    
    type Product {
        _id: ID
        name: String!
        image: String!
        description: String!
        price: Int!
        category: String!
        size: String!
        stock: Int!
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
        users: [User]
        user(username: String!): User
        products: [Product]
        product(productId: ID!): Product
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addProduct(name: String!,, description: String!, image: String!, price: Int!, category: String!, size: String!, stock: Int!): Product
        updateProduct(productId: ID!, name: String!,, description: String!, image: String!, price: Int!, category: String!, size: String!, stock: Int!): Product
        deleteProduct(productId: ID!): Product
    }

`;


module.exports = typeDefs;