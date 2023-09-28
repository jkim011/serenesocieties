import React, { useState } from "react";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_FROM_CART } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Button from "react-bootstrap/Button"
import { ADD_TO_CART } from "../utils/mutations";
import { loadStripe } from "@stripe/stripe-js"

import  "../styles/cartList.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

////////////////////////////////////////////////
let stripePromise;
const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }
  return stripePromise;
}
///////////////////////////////////////////

const CartList = () => {
  
  const navigate = useNavigate()
    
  const {loading, data, error} = useQuery(QUERY_ME);
  let cartItems = data?.me.cartItems || []
  console.log(cartItems, "cartItems")

  const [removeFromCart, {rmvError}] = useMutation(REMOVE_FROM_CART)
  const [addCartItem, {err}] = useMutation(ADD_TO_CART)

  let localCartItems = JSON.parse(localStorage.getItem("allCartItems"))
  console.log(localCartItems, "from localStorage")
 
  const combineCarts = () => {
    if(localStorage.getItem("allCartItems")) {
      console.log(localCartItems, "from localStorage")

      for(let i = 0; i < localCartItems.length; i++) {
        console.log(localCartItems[i].cartProductName, "NAME")
        try {
          const {cartData} = addCartItem({
            variables:
            {
              userId: Auth.getProfile().data._id,
              cartProductId: localCartItems[i].cartProductId,
              cartProductName: localCartItems[i].cartProductName,
              cartProductSizeId: localCartItems[i].cartProductSizeId,
              cartProductSize: localCartItems[i].cartProductSize,
              cartProductImage: localCartItems[i].cartProductImage,
              cartProductPrice: localCartItems[i].cartProductPrice,
              cartProductPriceId: localCartItems[i].cartProductPriceId,
            },
          });
          navigate(0)
        } catch(err){
          console.log(err)
        } 
      }
      localStorage.removeItem("allCartItems")
    }
  }

  combineCarts()
  

  const findMatchingCartItems = (cartItems) => {
    let counts = {}
    let testQuant = []

    for(let i = 0; i < cartItems.length; i++) { 
      var productId = cartItems[i].cartProductId
      
      if(counts[cartItems[i].cartProductSizeId]) {
        // const countsItems = counts[cartItems[i].cartProductSizeId]
        counts[cartItems[i].cartProductSizeId] += 1
      } else {
        counts[cartItems[i].cartProductSizeId] = 1
      }
      console.log(cartItems[i].cartProductName, counts[cartItems[i].cartProductSizeId], "console")
    }  

    for (let prop in counts){
      if (counts[prop] >= 2){
        console.log(prop + " counted: " + counts[prop] + " times.")
        console.log(productId)
      }
    }
    console.log(counts)
    console.log(testQuant, "test quant")

  }

  findMatchingCartItems(cartItems)


  ///////////////////////////////////////////
  const [stripeError, setStripeError] = useState(null)
  const [isLoading, setLoading] = useState(false)

  let allItems = []
  for(let i = 0; i < cartItems.length; i++) {
    const items = 
      {
        price: cartItems[i].cartProductPriceId,
        quantity: 1 // will be cartItems[i].cartProductQuantity  also need to make quantity editable in stripe checkout
      }
    allItems.push(items)
  }
  console.log(allItems, "ALL ITEMS ")

  const checkoutOptions = {
    lineItems: allItems,
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cart`
  }

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirect");
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout(checkoutOptions)
    console.log("stripe checkout err", error)

    if(error) setStripeError(error.message);
    setLoading(false);
  }
  if(stripeError) alert(stripeError)
  /////////////////////////////////////////////////////

  // To calculate cart total
  let cartTotalPrice = 0
  for ( let i=0; i < cartItems.length; i++) {
      console.log(cartItems[i].cartProductPrice, "forloop")
      cartTotalPrice += parseInt(cartItems[i].cartProductPrice)
  }

  if(cartTotalPrice === 0) {
    return (
      <div>
        <h5 className="text-center">Your cart is empty</h5>
        <Link as={Link} to="/shop/all-products" className="text-decoration-none text-black"><h6 className="text-center mt-3">Continue shopping</h6></Link>
      </div>
    )
  }

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

      <div className="text-center">
        <h5>Total: ${cartTotalPrice}</h5>
        <Link as={Link} to="/shop/all-products" className="text-decoration-none text-black"><h6 className="text-center mt-3 mb-2">Continue shopping</h6></Link>
        <button onClick={redirectToCheckout} disabled={isLoading}>{isLoading ? "Loading..." : "Checkout"}</button>
      </div>
    </div>

  )
}

export default CartList;