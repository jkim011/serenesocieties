import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import testShirtBack from '../../assets/clothes/testShirtBack.jpg';
import testShirtFront from '../../assets/clothes/testShirtFront.jpg';

function SingleProduct() {
  
  return (
    <div className="single-product-container">
      <img src={testShirtBack} className="product-image"/>

      <div className="product-info">
        <h3>Product Name <span style={{marginLeft:"20px"}}>$25</span></h3>
        <ul className="product-description">
          <li>Desc </li>
          <li>Desc </li>
          <li>Desc </li>
          <li>Desc </li>
        </ul>
        <div className="product-btns">
          <DropdownButton className="product-size" title="Size" variant="light">
            <Dropdown.Item href="#/action-1">S</Dropdown.Item>
            <Dropdown.Item href="#/action-2">M</Dropdown.Item>
            <Dropdown.Item href="#/action-3">L</Dropdown.Item>
            <Dropdown.Item href="#/action-3">XL</Dropdown.Item>
          </DropdownButton>
          <button className="btns">Add to cart</button>
        </div>
      </div>
      
    </div>
  )
}

export default SingleProduct;