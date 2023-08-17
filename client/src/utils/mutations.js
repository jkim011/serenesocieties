import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String! $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
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
        username
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct($name: String!, $image: String, $description: String!, $price: Int!, $category: Category, $stock: Stock) {
    addProduct(name: $name, image: $image, description: $description, price: $price, category: $category, stock: $stock) {
        _id
        name
        image
        image2
        description
        price
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
  mutation addToCart($userId: ID!, $cartProductId: String!, $cartProductName: String!, $cartProductSizeId: String!, $cartProductSize: String!, $cartProductImage: String!, $cartProductPrice: Int!) {
    addToCart(userId: $userId, cartProductId: $cartProductId, cartProductName: $cartProductName, cartProductSizeId: $cartProductSizeId, cartProductSize: $cartProductSize, cartProductImage: $cartProductImage, cartProductPrice: $cartProductPrice) {
      _id
      email
      username
      cartItems{
        cartProductId
        cartProductName
        cartProductSizeId
        cartProductSize
        cartProductImage
        cartProductPrice
      }
    }
  }

`;

export const REMOVE_FROM_CART = gql `
  mutation removeFromCart($userId: ID!, $cartId: ID!) {
    removeFromCart(userId: $userId, cartId: $cartId) {
      _id
      email
      username
      cartItems{
        cartProductId
        cartProductName
        cartProductSizeId
        cartProductSize
        cartProductImage
        cartProductPrice
      }
    }
  }

`;