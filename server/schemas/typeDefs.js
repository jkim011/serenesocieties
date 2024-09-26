const { gql } = require("apollo-server-express");

const typeDefs = gql`
    scalar Date
    
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
        isCollection: Boolean!
    }

    type Stock {
        _id: ID
        size: String!
        quantity: Int!
        priceId: String!
    }

    type cartItem {
        _id: ID
        cartProductId: String
        cartProductName: String
        cartProductSizeId: String
        cartProductSize: String
        cartProductImage: String
        cartProductPrice: Float
        cartProductPriceId: String
        cartProductQuantity: Int
    }

    type User{
        _id: ID
        firstName: String!
        lastName: String!
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
        user(email: String!): User
        products(category: [ID], name: String): [Product]
        product(productId: ID!): Product
        cartProducts(cartId: [ID!]): [Product]
        productSize(productId: ID!, stockId: ID!): Product
        categories: [Category]
        category(categoryId: ID!): Category
        inventory: [Stock]
        stock(stockId: ID!): Stock
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        addProduct(name: String!,, description: String!, image: String, image2: String, price: Float!, categories: [ID]): Product
        updateProduct(productId: ID!, name: String!,, description: String!, image: String, image2: String, price: Float!, categories: [ID]): Product
        deleteProduct(productId: ID!): Product
        addCategory(name: String!, routeName: String!, isCollection: Boolean!): Category
        updateCategory(categoryId: ID!, name: String!, routeName: String!, isCollection: Boolean!): Category
        addStock(productId: ID!, size: String!, quantity: Int!, priceId: String!): Stock
        updateStock(stockId: ID!, size: String!, quantity: Int!, priceId: String!): Stock
        deleteStock(stockId: ID!): Stock
        addToCart(userId: ID!, cartProductId: String, cartProductName: String! cartProductSizeId: String!, cartProductSize: String!, cartProductImage: String!, cartProductPrice: Float!, cartProductPriceId: String!, cartProductQuantity: Int): User
        removeFromCart(userId: ID!, cartId: ID!): User
        addToCartQuantity(userId: ID, cartId: ID!, cartProductQuantity: Int): User
        removeCartQuantity(userId: ID, cartId: ID!): User
        updateProductInventory(productId: ID, sizeId: ID, cartProductQuantity: Int): Product
    }

`;


module.exports = typeDefs;