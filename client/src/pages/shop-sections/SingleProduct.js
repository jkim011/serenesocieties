import React from "react";
import Carousel from 'react-bootstrap/Carousel';

import testShirtBack from '../../assets/clothes/testShirtBack.jpg';
import testShirtFront from '../../assets/clothes/testShirtFront.jpg';

function SingleProduct() {
  
  return (
    <div className="single-product-container">
      <Carousel className="product-image" interval={null} variant="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={testShirtBack}
            alt=""
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={testShirtFront}
            alt=""
          />
        </Carousel.Item>
      </Carousel>

      <div className="product-info">
        <h3>Product Name <span style={{marginLeft:"30px"}}>$25.00</span></h3>
        <ul className="product-description">
          <li>Desc blah balhc aldkfj aldk faksdf jfl jksdf lk k </li>
          <li>Desc </li>
          <li>Desc </li>
          <li>Desc </li>
        </ul>
        <form className="product-btns">
            <label for="product-size">Size: </label>
            <select id="product-size" className="product-size" name="Size">
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
            </select>

          <button className="btns cart-btn">Add to cart</button>
        </form>
      </div>
      
    </div>
  )
}

export default SingleProduct;