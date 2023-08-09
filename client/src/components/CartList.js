import React from "react";
import { useState } from "react";
import { QUERY_ME, QUERY_SINGLE_PRODUCT } from "../utils/queries";
import { useQuery } from "@apollo/client";
import ProductList from "./ProductList";

const CartList = () => {
    const {loading, data, error} = useQuery(QUERY_ME);

    const cartItems = data?.me.cartItems || []

    console.log(cartItems, "cartItems")
    

    let productIds = cartItems.map(cartItem => {
        return cartItem.cartProduct
    })
    console.log(productIds.pop())
    let pIn = productIds.pop()
    console.log(pIn, 'pin')
    const {loading: productLoading, data: productData, error: productError} = useQuery(QUERY_SINGLE_PRODUCT, {
        variables: {productId: pIn}
    })
    
    console.log(productData)

   
   



    return(
        <>
        <div  >
        {cartItems && cartItems.map((cartItem) =>(
            <div key={cartItem._id}>
                {/* <p>Size: {cartItem.cartProductSize}</p> */}
                <p>ID: {cartItem.cartProduct}</p>
            </div>
        )) } 
        </div>

        <div>

        </div>


        </>
    )
}

export default CartList;