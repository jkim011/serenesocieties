const { gql } = require("apollo-server-express");

const typeDefs = gql`
    
    type Product {
        _id: ID
        name: String!
        image: String
        image2: String
        description: String!
        price: Float!
        categories: [Category]   
        inventory: [Stock]
    }

    type Category {
        _id: ID
        name: String!
        routeName: String!
    }

    type Stock {
        _id: ID
        size: String!
        quantity: Int!
    }

    type cartItem {
        _id: ID
        cartProduct: ID
    }

    type User{
        _id: ID
        username: String!
        email: String!
        password: String!
        cartItems: [cartItem]
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
        products(category: [ID], name: String): [Product]
        product(productId: ID!): Product
        productSize(productId: ID!, stockId: ID!): Product
        categories: [Category]
        category(categoryId: ID!): Category
        inventory: [Stock]
        stock(stockId: ID!): Stock
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addProduct(name: String!,, description: String!, image: String, image2: String, price: Float!, categories: [ID]): Product
        updateProduct(productId: ID!, name: String!,, description: String!, image: String, image2: String, price: Float!): Product
        deleteProduct(productId: ID!): Product
        addCategory(productId: ID! name: String!, routeName: String!): Category
        updateCategory(categoryId: ID!, name: String!, routeName: String!): Category
        addStock(productId: ID!, size: String!, quantity: Int!): Stock
        updateStock(stockId: ID!, size: String!, quantity: Int!): Stock
        deleteStock(stockId: ID!): Stock
        addItemToCart(userId: ID!, cartProduct: ID!): User
        removeItemFromCart(userId: ID!, productId: ID!): User
    }

`;


module.exports = typeDefs;