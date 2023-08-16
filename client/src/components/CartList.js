import React from "react";
import { useState } from "react";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import ProductList from "./ProductList";
import  "../styles/cartList.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CartList = () => {
    const {loading, data, error} = useQuery(QUERY_ME);
    const cartItems = data?.me.cartItems || []
    console.log(cartItems, "cartItems")
    
    // To calculate cart total
    let cartTotalPrice = 0
    for ( let i=0; i < cartItems.length; i++) {
        console.log(cartItems[i].cartProductPrice, "forloop")
        cartTotalPrice += parseInt(cartItems[i].cartProductPrice)
    }
    console.log(cartTotalPrice)

    return (
      <div className="cartContainer container flex " >
         
        {cartItems && cartItems.map((cartItem) =>(
          <div key={cartItem._id} className="border row mb-2" >
            <div className="col-6">
              <img className="cartImageComponent" src={cartItem.cartProductImage}/>
            </div>
          <div className="col-6 cartItemDetails">
           
              <p>{cartItem.cartProductName}</p>
              
            
              <p>{cartItem.cartProductSize}</p>
             
              <p>${cartItem.cartProductPrice}</p>
              </div>
              <FontAwesomeIcon icon="fa-solid fa-trash-can" />
          </div>
        
        )) } 

        <p>Total: ${cartTotalPrice}</p>
      </div>

    )
}

export default CartList;