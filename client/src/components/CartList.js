import React from "react";
import { useState } from "react";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_FROM_CART } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Button from "react-bootstrap/Button"

import  "../styles/cartList.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";
import Auth from "../utils/auth";

const CartList = () => {
    
    const {loading, data, error} = useQuery(QUERY_ME);
    const cartItems = data?.me.cartItems || []
    console.log(cartItems, "cartItems")

    const [removeFromCart, {rmvError}] = useMutation(REMOVE_FROM_CART)

    const handleRemoveFromCart = async (event) => {
      event.preventDefault();
      

      try {
        let {cartData} = await removeFromCart({
          variables: {
            userId: Auth.getProfile().data._id,
            // cartId: cart._id
          }
        })
      } catch(err) {
        console.log(err)
      }
    }

    // To calculate cart total
    let cartTotalPrice = 0
    for ( let i=0; i < cartItems.length; i++) {
        console.log(cartItems[i].cartProductPrice, "forloop")
        cartTotalPrice += parseInt(cartItems[i].cartProductPrice)
    }
    console.log(cartTotalPrice)

    return (
      <div className="cartContainer container flex " name="cartItem"  >
         
        {cartItems && cartItems.map((cartItem) =>(
          <div key={cartItem._id} className="border row mb-2" >
            <div className="col-4 border">
              <img className="cartImageComponent" src={cartItem.cartProductImage}/>
            </div>
          <div className="col-8 cartItemDetails">
              
              <p><strong>{cartItem.cartProductName}</strong> - {cartItem.cartProductSize}</p>
              
              <p>${cartItem.cartProductPrice}</p>
          

              <div className="container  mb-2  justify-content-end">
                <div className="row justify-content-end ">
              <Button className="col-2" size="sm" variant="danger" onClick={
                 async (event) => {
                  event.preventDefault();
                  
            
                  try {
                    let {cartData} = await removeFromCart({
                      variables: {
                        userId: Auth.getProfile().data._id,
                        cartId: cartItem._id
                      }
                    })
                  } catch(err) {
                    console.log(err)
                  }
                }


              }><FontAwesomeIcon icon="fa-solid fa-trash-can" /></Button>
              </div>
            </div>

          
          </div>

             

          </div>
        
        )) } 

        <p>Total: ${cartTotalPrice}</p>
      </div>

    )
}

export default CartList;