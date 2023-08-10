import React from "react";
import { useState } from "react";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import ProductList from "./ProductList";

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
      <div  >
        {cartItems && cartItems.map((cartItem) =>(
          <div key={cartItem._id}>
            <p>Product ID: {cartItem.cartProductId}</p>
            <p>{cartItem.cartProductName}</p>
            <p>Stock ID: {cartItem.cartProductSizeId}</p>
            <p>{cartItem.cartProductSize}</p>
            <p>${cartItem.cartProductPrice}</p>
            <img src={cartItem.cartProductImage} style={{width: "50px"}}/>
          </div>
        )) } 

        <p>Total: ${cartTotalPrice}</p>
      </div>

    )
}

export default CartList;