import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import shirt from "../assets/clothes/testShirt.png";
import "../styles/productList.css";
import { QUERY_CATEGORIES, QUERY_PRODUCTS } from '../utils/queries';
import { useQuery } from "@apollo/client";

const ProductList = () => {
  const { loading, data, error } = useQuery(QUERY_PRODUCTS);
  const products = data?.products || [];
  
  const params = useParams()
  
  var selectProductArr = [] 

  const matchingCategories = () =>{
    for (let i = 0; i < products.length; i++) {
      for(let j=0; j<products[i].categories.length; j++){
        let productChose = products[i]
        let productCategory = products[i].categories[j].routeName
        if(productCategory == params.routeName){
          console.log(productCategory,"match", productChose)
          selectProductArr.push(productChose)
        
        } 
      }
    }
  }

  matchingCategories()

  if (loading) {
    return <div>Loading</div>;
  }
  return(
    <div
      id="productCardContainer"
      className="d-flex flex-row flex-wrap justify-content-around"
    >
      {params.routeName == "all-products" ? products && products.map((product) =>(

      <div key={product._id} className="m-2 productCard">
        <div id="productHead">
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
            <h5 className="col text-center productText">
              {product.name}
            </h5>
            <h5 className="col text-center productText">
              ${product.price}
            </h5>
          </div>
        </div>
      </div>
      )) : <></> }

      {selectProductArr.map(product => (
          <div key={product._id} className="m-2 productCard">
            <div id="productHead">
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
                <h5 className="col text-center productText">
                  {product.name}
                </h5>
                <h5 className="col text-center productText">
                  ${product.price}
                </h5>
              </div>
            </div>
          </div>
        ))}

    </div>
  )
}

export default ProductList;