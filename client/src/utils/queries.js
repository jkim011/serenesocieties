import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts {
    products {
      _id
      name
      image
      image2
      price
      inventory {
        _id
        size
        quantity
      }
      categories {
        _id
        name
        routeName
      }
      
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
      inventory {
        _id
        size
        quantity
      }
      categories {
        _id
        name
        routeName
      }

    }
  }
`;

export const QUERY_CART_PRODUCTS = gql`
query getCartItems($productId: [ID!]){
  product(productId: $productId) {
    _id
    name
    image
    image2
    description
    price

}
}
`

export const QUERY_CATEGORIES = gql`
  query getCategories {
    categories {
      _id
      name
      routeName
    }
  }
`;

export const QUERY_SINGLE_CATEGORY = gql`
  query getSingleCategory($categoryId: ID!) {
    category(categoryId: $categoryId) {
      _id
      name
      routeName
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      isAdmin
      cartItems {
        _id
        cartProduct
        cartProductSize
        
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      isAdmin
      cartItems {
        _id
        cartProduct
        cartProductSize
        
      }
    }
  }
`;