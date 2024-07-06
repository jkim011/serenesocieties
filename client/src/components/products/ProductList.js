import React from "react";
import { useState } from "react";
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
    <div>
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
                <h6 className="col productText fw-bold">
                  {product.name}
                </h6>
                <h6 className="col productText">
                  ${product.price}
                </h6>
              </div>
            </div>
          </div>
        )) : null }
      </div>

      <div className="productGrid">
        {selectProductArr.map(product => (
          <div key={product._id} className="productCard">
            <div className="productHead">
              <Link to={`/shop/products/${product._id}`}>
                <img className="productImg" src={product.image} alt="" />
                <img className="productImg productImg2" src={product.image2} alt="" />
              </Link>
            </div>
            <div className="container">
              <div id="productDetails" className="column">
                <h6 className="col productText fw-bold">
                  {product.name}
                </h6>
                <h6 className="col productText">
                  ${product.price}
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList;