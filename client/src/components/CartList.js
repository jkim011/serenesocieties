import React from "react";
import { useState } from "react";
import { QUERY_ME, QUERY_SINGLE_PRODUCT, QUERY_CART_PRODUCTS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import ProductList from "./ProductList";

const CartList = () => {
    const {loading, data, error} = useQuery(QUERY_ME);

    const cartItems = data?.me.cartItems || []

    console.log(cartItems, "cartItems")
    

    // let productIds = cartItems.map(cartItem => {
    //     return cartItem.cartProductId
    // })
    // console.log(productIds, "productIDs")
    
    // const {loading: productLoading, data: productData, error: productError} = useQuery(QUERY_CART_PRODUCTS, {
    //     variables: {productId: productIds}
    // })
    
    // console.log(productData, 'productData')
    

    return(
        <>
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
            </div>


        </>
    )
}

export default CartList;