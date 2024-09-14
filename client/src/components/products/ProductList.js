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
  console.log(products)

  const soldOut = () => {
    //query inv data, if all inv.quantity == 0 then soldOut == true
    
  }
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
                <h4 className="col product-name fw-bold">
                  {product.name}
                </h4>
                <h4 className="col product-price">
                  ${product.price}
                </h4>
              </div>
            </div>
          </div>
        )) : 
        selectProductArr.map(product => (
          <div key={product._id} className="productCard">
            <div className="productHead">
              <Link to={`/shop/products/${product._id}`}>
                <img className="productImg" src={product.image} alt="" />
                <img className="productImg productImg2" src={product.image2} alt="" />
              </Link>
            </div>
            <div className="container">
              <div id="productDetails" className="column">
                <h6 className="col product-name fw-bold">
                  {product.name}
                </h6>
                <h6 className="col product-price">
                  ${product.price}
                </h6>
              </div>
            </div>
          </div>
        )) }
      </div>
    </div>
  )
}

export default ProductList;