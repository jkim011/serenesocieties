import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PRODUCT } from "../../utils/queries";

function SingleProduct() {
  const { productId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { productId: productId }
  });

  const product = data?.product || {};
  const inventory = product.inventory
  console.log(product)
  console.log(inventory, "inventory in SingleProduct")

  return (
    <div className="single-product-container">
      <Carousel className="product-image" interval={null} variant="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={product.image}
            alt="image1"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={product.image2}
            alt="image2"
          />
        </Carousel.Item>
      </Carousel>

      <div className="product-info">
        <h3>{product.name} <span style={{marginLeft:"30px"}}>${product.price}</span></h3>
        <ul className="product-description">
          <li>{product.description}</li>
          <li>Desc </li>
          <li>Desc </li>
          <li>Desc </li>
        </ul>

        <form className="product-btns">
            <label>Size: </label>
            <select id="product-size" className="product-size" name="Size">
              {inventory?.map(stock => <option key={stock._id}>{stock.size}</option>)}
            </select>

          <button className="btns cart-btn">Add to cart</button>
        </form>
      </div>
      
    </div>
  )
}

export default SingleProduct;