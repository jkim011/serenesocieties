import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from "react";
import { QUERY_SINGLE_PRODUCT } from "../../utils/queries";
import {ADD_TO_CART} from "../../utils/mutations"
import Auth from "../../utils/auth";
import "../../styles/singleProduct.css"

function SingleProduct() {
  const { productId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { productId: productId }
  });
  const navigate = useNavigate()

  const product = data?.product || {};
  const inventory = product.inventory
 
  const sizeDataName = data?.product.inventory[0].size
  const sizeDataId = data?.product.inventory[0]._id
  const sizeData = [sizeDataName, sizeDataId]
  const useStateData = sizeData.toString()

  const [size, setSize] = useState("--")

  const handleSizeSelect = (event) => {
    const {name, value} = event.target;
    if(name === "Size"){
      setSize(value)  
    }
  }
  const sizeFields = size.split(',')
  const sizeName = sizeFields[0]
  const sizeId = sizeFields[1]

  console.log("__________________________________________")
  console.log("CartProductId", productId)
  console.log("product name", product.name)
  console.log("image", product.image)
  console.log("price", product.price)
  console.log("priceId", product.priceId)
  console.log("sizeId", sizeId )
  console.log("sizeName", sizeName )
  console.log("__________________________________________")


  const [addCartItem, {error}] = useMutation(ADD_TO_CART)

  const [cartBtnText, setCartBtnText] = useState("Add to cart")
  const showCheckMark = () => {
    setCartBtnText("Added ✓")
    setTimeout(removeCheckMark, 2000)
  }
  const removeCheckMark = () => {
    setCartBtnText("Add to cart")
  }

  const handleAddToCart = async (event) => {
    event.preventDefault();
    try {
      const {cartData} = await addCartItem({
        variables:
        {
          userId: Auth.getProfile().data._id,
          cartProductId: productId,
          cartProductName: product.name,
          cartProductSizeId: sizeId,
          cartProductSize: sizeName,
          cartProductImage: product.image,
          cartProductPrice: product.price,
          cartProductPriceId: product.priceId
        },
      });
      navigate(0)
      showCheckMark();
    } catch(err){
      console.log(err)
    } 
  }

  let existingLocalCartItems = JSON.parse(localStorage.getItem("allCartItems"))
  const handleAddToCartLocal = async (event) =>{
    event.preventDefault();
    if(existingLocalCartItems == null) existingLocalCartItems = []
    var cartItemIndex = Math.random()

    let cartItem = {
      'cartProductId': productId, 
      "cartProductName": product.name, 
      "cartProductSizeId": sizeId, 
      "cartProductSize": sizeName, 
      "cartProductImage": product.image, 
      "cartProductPrice": product.price,
      "cartProductPriceId": product.priceId,
      "cartItemIndex": cartItemIndex
    }
    localStorage.setItem("cartItem", JSON.stringify(cartItem))
    existingLocalCartItems.push(cartItem)
    localStorage.setItem("allCartItems", JSON.stringify(existingLocalCartItems))
    navigate(0)
    // localStorage.getItem("allCartItems")
    showCheckMark();
    

  }

  if(loading){
    return(
      <div>
        <p>Loading</p>
      </div>
    )
  } else 
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
            <option id="blankOption">--</option> 
              {inventory?.map(stock =><option className="sizeId" value={[stock.size, stock._id]} key={stock._id}>{stock.size}</option>)}
            </select>
          <div className="testing">
          {Auth.loggedIn() ? (
            <button id="addCartBtn" className="btns cart-btn " onClick={handleAddToCart} disabled={size === "--"}>{cartBtnText}</button>
          ):(
            <button id="addCartLocalBtn" className="btns cart-btn " onClick={handleAddToCartLocal} disabled={size === "--"}>{cartBtnText}</button>
          )}
          </div>
          
        </form>
      </div>
      
    </div>
  )
}

export default SingleProduct;