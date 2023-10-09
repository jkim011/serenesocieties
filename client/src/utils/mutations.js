import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct($name: String!, $image: String, $description: String!, $price: Int!, $priceId: String!, $category: Category, $stock: Stock) {
    addProduct(name: $name, image: $image, description: $description, price: $price, priceId: $priceId, category: $category, stock: $stock) {
        _id
        name
        image
        image2
        description
        price
        priceId
        category {
          _id
          name
        }
        
        stock {
          _id
          size
          stock
        }
    }
  }
`;

export const ADD_TO_CART = gql `
  mutation addToCart($userId: ID!, $cartProductId: String!, $cartProductName: String!, $cartProductSizeId: String!, $cartProductSize: String!, $cartProductImage: String!, $cartProductPrice: Int!, $cartProductPriceId: String!, $cartProductQuantity: Int) {
    addToCart(userId: $userId, cartProductId: $cartProductId, cartProductName: $cartProductName, cartProductSizeId: $cartProductSizeId, cartProductSize: $cartProductSize, cartProductImage: $cartProductImage, cartProductPrice: $cartProductPrice, cartProductPriceId: $cartProductPriceId, cartProductQuantity: $cartProductQuantity) {
      _id
      email
      firstName
      lastName
      cartItems{
        cartProductId
        cartProductName
        cartProductSizeId
        cartProductSize
        cartProductImage
        cartProductPrice
        cartProductPriceId
        cartProductQuantity
      }
    }
  }

`;

export const REMOVE_FROM_CART = gql `
  mutation removeFromCart($userId: ID!, $cartId: ID!) {
    removeFromCart(userId: $userId, cartId: $cartId) {
      _id
      email
      firstName
      lastName
      cartItems{
        cartProductId
        cartProductName
        cartProductSizeId
        cartProductSize
        cartProductImage
        cartProductPrice
        cartProductPriceId
        cartProductQuantity
      }
    }
  }

`;

export const ADD_TO_CART_QUANTITY = gql `
  mutation addToCartQuantity($userId: ID!, $cartId: ID!) {
    addToCartQuantity(userId: $userId, cartId: $cartId) {
      _id
      cartItems{
        cartProductId
        cartProductName
        cartProductSizeId
        cartProductSize
        cartProductImage
        cartProductPrice
        cartProductPriceId
        cartProductQuantity
      }
    }
  }
`;

export const REMOVE_CART_QUANTITY = gql `
  mutation removeCartQuantity($userId: ID!, $cartId: ID!) {
    removeCartQuantity(userId: $userId, cartId: $cartId) {
      _id
      cartItems{
        cartProductId
        cartProductName
        cartProductSizeId
        cartProductSize
        cartProductImage
        cartProductPrice
        cartProductPriceId
        cartProductQuantity
      }
    }
  }
`;