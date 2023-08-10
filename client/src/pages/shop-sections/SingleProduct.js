import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from "react";
import { QUERY_SINGLE_PRODUCT } from "../../utils/queries";
import {ADD_TO_CART} from "../../utils/mutations"
import Auth from "../../utils/auth";

function SingleProduct() {
  const { productId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { productId: productId }
  });
  // console.log(data, "data")
  const product = data?.product || {};
  const inventory = product.inventory
  // console.log(product)
  // console.log(inventory, "inventory in SingleProduct")
  // console.log(Auth.getProfile().data._id, "userid")
  // console.log(productId, "product")
  // console.log(product.image, "image")
  // console.log(product.price, "price")

  const [size, setSize] = useState("Small")
  const [sizeId, setSizeId] = useState("")
  // console.log(product.inventory[0]._id, "size ID")

  const handleSizeSelect = (event) => {
    const {name, value, key} = event.target;
   

    if(name === "Size"){
      setSize(value)
      
    }
    if(name === "sizeId"){
      setSizeId(key)
    }
  
  }
  console.log(size)
  // console.log(sizeId)
  // const sizeIdValue = document.querySelector(".sizeId")
  // console.log(sizeIdValue)
 
  

  const [addCartItem, {error}] = useMutation(ADD_TO_CART)

  const handleAddToCart = async (event) => {
    event.preventDefault();

    try{
      const {cartData} = await addCartItem({
        variables:
        {
          userId: Auth.getProfile().user._id,
          cartProductId: productId,
          cartProductImage: product.image,
          cartProductPrice: product.price,
          cartProductSize: size
          
        
        },
      });
    } catch(err){
      console.log(err)
    }
  }

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
            <select id="product-size" className="product-size"  name="Size"  value={size}  onChange={handleSizeSelect} >
              {inventory?.map(stock => <option className="sizeId" value={[stock.size, stock._id]} key={stock._id}>{stock.size}</option>)}
            </select>

          <button className="btns cart-btn">Add to cart</button>
        </form>
      </div>
      
    </div>
  )
}

export default SingleProduct;