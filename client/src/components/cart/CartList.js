import React, { useState } from "react";
import { QUERY_ME } from "../../utils/queries";
import { ADD_TO_CART, REMOVE_FROM_CART, ADD_TO_CART_QUANTITY, REMOVE_CART_QUANTITY } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Button from "react-bootstrap/Button"
import { loadStripe } from "@stripe/stripe-js"

import  "../../styles/cartList.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

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

  const [addToCartQuantity, {addQuantError}] = useMutation(ADD_TO_CART_QUANTITY)
  const [removeCartQuantity, {rmvQuantError}] = useMutation(REMOVE_CART_QUANTITY)

  let localCartItems = JSON.parse(localStorage.getItem("allCartItems"))
  console.log(localCartItems, "from localStorage")
 
  const combineCarts = () => {
    if(localStorage.getItem("allCartItems")) {
      for(let i = 0; i < localCartItems.length; i++) {
        if(cartItems.find(cartItem => cartItem.cartProductId === localCartItems[i].cartProductId && cartItem.cartProductSizeId === localCartItems[i].cartProductSizeId)) {
          try {
            let {cartData} = addToCartQuantity({
              variables: {
                userId: Auth.getProfile().data._id,
                cartId: cartItems[i]._id,
                cartProductQuantity: localCartItems[i].cartProductQuantity
              }
            });
          } catch (err) {
            console.log(err)
          }
        } else {

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
                cartProductQuantity: localCartItems[i].cartProductQuantity
              },
            });
            navigate(0)
          } catch(err){
            console.log(err)
          } 
        }
      }
      localStorage.removeItem("allCartItems")
    }
  }

  combineCarts()

  ///////////////////////////////////////////
  const [stripeError, setStripeError] = useState(null)
  const [isLoading, setLoading] = useState(false)

  let allItems = []
  for(let i = 0; i < cartItems.length; i++) {
    const items = 
      {
        price: cartItems[i].cartProductPriceId,
        quantity: cartItems[i].cartProductQuantity,
        // add adjustable quantity for checkout page
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
      cartTotalPrice += parseInt(cartItems[i].cartProductPrice) * cartItems[i].cartProductQuantity
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
    <div className="container flex justify-content-center cartListWidth" name="cartItem">
      <div className="col">
        {cartItems && cartItems.map((cartItem) =>(
          <div key={cartItem._id} className="cartItemHeight border-top border-bottom border-dark row mb-3 position-relative" >
            <div className="col d-flex justify-content-start align-items-start">
              <img className="cartImageComponent" src={cartItem.cartProductImage}/>
            </div>

            <div className="col-8 flex flex-column justify-content-center">          
              <p><strong>{cartItem.cartProductName}</strong></p>
              <p>Size: {cartItem.cartProductSize}</p> 
              <p>Price: ${cartItem.cartProductPrice}</p>

              <div className="d-flex align-items-center">
                
                <button className="w-15" onClick={
                  async (event) => {
                    event.preventDefault();
                    try {
                      let {cartData} = await removeCartQuantity({
                        variables: {
                          userId: Auth.getProfile().data._id,
                          cartId: cartItem._id
                        }
                      })
                    } catch(rmvQuantError) {
                      console.log(rmvQuantError)
                    }
                  }
                }><strong>-</strong></button>

                <p className="ms-1 me-1 pt-2">{cartItem.cartProductQuantity}</p>

                <button className="w-15" onClick={
                  async (event) => {
                    event.preventDefault();
                    try {
                      let {cartData} = await addToCartQuantity({
                        variables: {
                          userId: Auth.getProfile().data._id,
                          cartId: cartItem._id,
                          cartProductQuantity: 1
                        }
                      })
                    } catch(addQuantError) {
                      console.log(addQuantError)
                    }
                  }
                }><strong>+</strong></button>     
              </div>

              <Link className="position-absolute top-0 end-0 text-decoration-none text-red" size="sm" onClick={
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
              }>
                <FontAwesomeIcon className="fa-xl mt-1 me-2" icon="fa-sharp fa-xmark" style={{color:"red"}}/>
              </Link>
            </div>
        </div>       
        )) }
      </div> 

      <div className="text-center col">
        <h5>Subtotal: ${cartTotalPrice}</h5>
        <Link as={Link} to="/shop/all-products" className="text-decoration-none text-black"><h6 className="text-center mt-3 mb-2">Continue shopping</h6></Link>
        <p>Shipping & taxes calculated at checkout</p>
        <button onClick={redirectToCheckout} disabled={isLoading}>{isLoading ? "Loading..." : "Checkout"}</button>
      </div>
    </div>

  )
}

export default CartList;