import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from "react";
import { QUERY_SINGLE_PRODUCT } from "../utils/queries";
import { QUERY_ME } from "../utils/queries";
import {ADD_TO_CART, ADD_TO_CART_QUANTITY} from "../utils/mutations"
import Auth from "../utils/auth";
import "../styles/singleProduct.css"

function AddToCart() {
const { productId } = useParams();
const product = useQuery(QUERY_SINGLE_PRODUCT, {
  variables: { productId: productId }
});
const inventory = product.data?.product.inventory

const me = useQuery(QUERY_ME);
let loggedInCartItems = me.data?.me.cartItems

const [addToCartQuantity, {addQuantError}] = useMutation(ADD_TO_CART_QUANTITY)

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
const sizePriceId = sizeFields[2]

console.log("__________________________________________")
console.log("CartProductId", productId)
console.log("product name", product.name)
console.log("image", product.image)
console.log("price", product.price)
console.log("priceId", product.priceId)
console.log("sizeId", sizeId )
console.log("sizeName", sizeName )
console.log("sizePriceId", sizePriceId )
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
////////// cart count /////////////////
const localCartItems = JSON.parse(localStorage.getItem("allCartItems"))
let count = 0
if(localCartItems) {
  for ( let i=0; i < localCartItems.length; i++) {
    count += parseInt(localCartItems[i].cartProductQuantity)
  }
}


const handleAddToCart = async (event) => {
  event.preventDefault();
  const cartProductId = productId;
  const cartProductSizeId = sizeId;
  const duplicateCartItem = loggedInCartItems.find(loggedInCartItem => loggedInCartItem.cartProductId === cartProductId && loggedInCartItem.cartProductSizeId === cartProductSizeId)

  if(duplicateCartItem) {
    try {
      let {cartData} = await addToCartQuantity({
        variables: {
          userId: Auth.getProfile().data._id,
          cartId: duplicateCartItem._id
        }
      });
      
      // navigate(0)
      showCheckMark();
    } catch (err) {
      console.log(err)
    }
  } else {
    try {
      const {cartData} = await addCartItem({
        variables: {
          userId: Auth.getProfile().data._id,
          cartProductId,
          cartProductName: product.data?.product.name,
          cartProductSizeId,
          cartProductSize: sizeName,
          cartProductImage: product.data?.product.image,
          cartProductPrice: product.data?.product.price,
          cartProductPriceId: sizePriceId,
          cartProductQuantity: 1
        },
      });    
      // navigate(0)
      showCheckMark();
    } catch(err){
      console.log(err)
    } 
  }
}
console.log(loggedInCartItems)

let existingLocalCartItems = JSON.parse(localStorage.getItem("allCartItems"))
const handleAddToCartLocal = async (event) =>{
  event.preventDefault();
  if(existingLocalCartItems == null) existingLocalCartItems = []

  const cartProductId = productId;
  const cartProductSizeId = sizeId;
  const duplicateCartItem = existingLocalCartItems.find(existingLocalCartItem => existingLocalCartItem.cartProductId === cartProductId && existingLocalCartItem.cartProductSizeId === cartProductSizeId)

  if(duplicateCartItem) {
    try {
      duplicateCartItem.cartProductQuantity += 1
    } catch (err) {
      console.log(err)
    }
  } else {
    let cartItem = {
      'cartProductId': productId, 
      "cartProductName": product.data?.product.name, 
      "cartProductSizeId": sizeId, 
      "cartProductSize": sizeName, 
      "cartProductImage": product.data?.product.image, 
      "cartProductPrice": product.data?.product.price,
      "cartProductPriceId": sizePriceId,
      "cartProductQuantity": 1
    }
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    existingLocalCartItems.push(cartItem);
  }
  localStorage.setItem("allCartItems", JSON.stringify(existingLocalCartItems));
  // navigate(0);
  showCheckMark();
}

return (
    <form className="product-btns">
            <label>Size: </label>
            <select id="product-size" className="product-size"  name="Size"  value={size}  onChange={handleSizeSelect} >
            <option id="blankOption">--</option> 
              {inventory?.map(stock =><option className="sizeId" value={[stock.size, stock._id, stock.priceId]} key={stock._id}>{stock.size}</option>)}
            </select>
          <div className="testing">
          {Auth.loggedIn() ? (
            <button id="addCartBtn" className="btns cart-btn " onClick={handleAddToCart} disabled={size === "--" || cartBtnText === "Added ✓"}>{cartBtnText}</button>
          ):(
            <button id="addCartLocalBtn" className="btns cart-btn " onClick={handleAddToCartLocal} disabled={size === "--" || cartBtnText === "Added ✓"}>{cartBtnText}</button>
          )}
          </div>
          {count}
        </form>
        
)

}

export default AddToCart;