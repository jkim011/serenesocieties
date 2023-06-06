import React from "react";
import { Link } from 'react-router-dom';
import shirt from "../assets/clothes/testShirt.png";
import "../styles/productList.css";

const ProductList = ({products}) => {
  return(
    <div id="productCardContainer" className="d-flex flex-row flex-wrap justify-content-around">
      {products && 
        products.map((product) => (
          <div key={product._id} id="productCard" className="m-2">

            <div id="productHead">
              <Link to={`/shop/${product._id}`}>
                <img className="productImg" src={product.image} alt="" />
                <img className="productImg productImg2" src={product.image2} alt="" />
              </Link>
            </div>

            <div className="container ">
              <div id="productDetails" className="column">
                <h5 className="col text-center productText">{product.name}</h5>
                <h5 className="col text-center productText">${product.price}</h5>
              </div>
            </div>

          </div>
        ))} 
    </div>
  )
}

export default ProductList;