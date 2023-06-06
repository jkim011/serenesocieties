import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts {
    products {
      _id
      name
      image
      image2
      price
      category
      
    }
  }
`;

export const QUERY_SINGLE_PRODUCT = gql`
  query getSingleProduct($productId: ID!) {
    product(productId: $productId) {
      _id
      name
      image
      image2
      description
      price
      category
      size
      stock
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;