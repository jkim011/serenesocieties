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

