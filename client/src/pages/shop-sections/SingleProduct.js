import React from "react";

import testShirtBack from '../../assets/clothes/testShirtBack.jpg';
import testShirtFront from '../../assets/clothes/testShirtFront.jpg';

function SingleProduct() {
  
  return (
    <div className="single-product-container">
      <img src={testShirtBack} className="product-image"/>

      <div className="product-info">
        <h3>Product Name</h3>
        <h4>$25</h4>
        <h5>Size: S   M   L   XL</h5>
        <button>Add to cart</button>
        <ul className="product-description">
          <li>Desc </li>
          <li>Desc </li>
          <li>Desc </li>
          <li>Desc </li>
        </ul>
      </div>
      
    </div>
  )
}

export default SingleProduct;