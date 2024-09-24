import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import shirt from "../../assets/clothes/testShirt.png";
import "../../styles/productList.css";
import { QUERY_CATEGORIES, QUERY_PRODUCTS } from '../../utils/queries';
import { useQuery } from "@apollo/client";

const ProductList = () => {
  const { loading, data, error } = useQuery(QUERY_PRODUCTS);
  const products = data?.products || [];
  
  const params = useParams()
  
  var selectProductArr = [] 
  var selectedCategory 

  const matchingCategories = () => {
    for (let i = 0; i < products.length; i++) {
      for(let j=0; j<products[i].categories.length; j++){
        let productChose = products[i]
        let productCategory = products[i].categories[j].routeName
        let productCategoryName = products[i].categories[j].name
        if(productCategory == params.routeName){
          console.log(productCategory,"match", productChose)
          selectProductArr.push(productChose)
          selectedCategory=productCategoryName
        } 
      }
    }
  }
  matchingCategories()
  // console.log(products)

  const soldOut = (product) => {
    for (let i = 0; i < product?.inventory.length; i++) {
      if (product?.inventory[i].quantity > 0) {
        return false; 
      }
    }
    return true;
  };
  soldOut();

  if (loading) {
    return <div>Loading</div>;
  }
  return(
    <div>
      <h4 className="category-name d-flex justify-content-center">
        {!selectedCategory ? "All Products" : selectedCategory}
      </h4>
      <div className="productGrid">
        {params.routeName == "all-products" ? products && products.map((product) =>(
          <div key={product._id} className="productCard">
            <div className={`${soldOut(product) ? 'sold-out' : 'hide'}`}>
              <p className="d-flex align-items-center m-0">SOLD OUT</p>
            </div>
            <div className="productHead">
              <Link to={`/shop/products/${product._id}`}>
                <img className="productImg" src={product.image} alt="" />
                <img
                  className="productImg productImg2"
                  src={product.image2}
                  alt=""
                />
              </Link>
            </div>
            <div className="container ">
              <div id="productDetails" className="column">
                <h5 className="col product-name fw-bold">
                  {product.name}
                </h5>
                <h5 className="col product-price">
                  ${product.price}
                </h5>
              </div>
            </div>
          </div>
        )) : 
        selectProductArr.map(product => (
          <div key={product._id} className="productCard">
            <div className={`${soldOut(product) ? 'sold-out' : 'hide'}`}>
              <p className="d-flex align-items-center m-0">SOLD OUT</p>
            </div>
            <div className="productHead">
              <Link to={`/shop/products/${product._id}`}>
                <img className="productImg" src={product.image} alt="" />
                <img className="productImg productImg2" src={product.image2} alt="" />
              </Link>
            </div>
            <div className="container">
              <div id="productDetails" className="column">
                <h5 className="col product-name fw-bold">
                  {product.name}
                </h5>
                <h5 className="col product-price">
                  ${product.price}
                </h5>
              </div>
            </div>
          </div>
        )) }
      </div>
    </div>
  )
}

export default ProductList;