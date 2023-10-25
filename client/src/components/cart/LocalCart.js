import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, decrementByAmount} from '../../redux/cartCounter';
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js"
import NavBar from "../Nav";
import CartCount from "./CartCount";

let stripePromise;
const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }
  return stripePromise;
}

const LocalCart = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const localCartItems = JSON.parse(localStorage.getItem("allCartItems"))
  console.log(localCartItems, "localCartItems")
  const [localCart, setLocalCart] = useState(JSON.parse(localStorage.getItem('allCartItems')) || []);

  const [stripeError, setStripeError] = useState(null)
  const [isLoading, setLoading] = useState(false)

  let allItems = []
  if(localCartItems) {
    for(let i = 0; i < localCartItems.length; i++) {
      const items = 
        {
          price: localCartItems[i].cartProductPriceId,
          quantity: localCartItems[i].cartProductQuantity,
          // add adjustable quantity for checkout page
        }
      allItems.push(items)
    }
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

  if(!localCartItems) {
    return (
      <div>
        <h5 className="text-center">Your cart is empty</h5>
        <Link as={Link} to="/shop/all-products" className="text-decoration-none text-black"><h6 className="text-center mt-3">Continue shopping</h6></Link>
      </div>
    )
  } 

  let cartTotalPrice = 0
  for ( let i=0; i < localCartItems.length; i++) {
    console.log(localCartItems[i].cartProductPrice, "forloop")
    cartTotalPrice += parseInt(localCartItems[i].cartProductPrice * localCartItems[i].cartProductQuantity)
  }
  if(cartTotalPrice === 0) {
    return (
      <div>
        <h5 className="text-center">Your cart is empty</h5>
        <Link as={Link} to="/shop/all-products" className="text-decoration-none text-black"><h6 className="text-center mt-3">Continue shopping</h6></Link>
      </div>
    )
  }

  let count = 0
  for ( let i=0; i < localCartItems.length; i++) {
    count += parseInt(localCartItems[i].cartProductQuantity)
  }
 
  return (
    <div className="w-75 container inline-sm-flex d-lg-flex justify-content-center" name="cartItem">
      <div className="col-lg-5 col-md-5">
        {localCartItems && localCartItems.map((cartItem, index) =>(
          <div key={cartItem._id} className="border row mb-2" >
            <div className="col-4 border">
              <img className="cartImageComponent" src={cartItem.cartProductImage}/>
            </div>

            <div className="col-8 cartItemDetails">          
              <p><strong>{cartItem.cartProductName}</strong></p>
              <p>Size: {cartItem.cartProductSize}</p>   
              <p>Price: ${cartItem.cartProductPrice}</p>

              <div className="d-flex align-items-center">
                <button className="w-15" onClick={
                  () => {
                    const updatedLocalCart = [...localCart];
                    const itemToUpdate = updatedLocalCart[index];

                    if (itemToUpdate && itemToUpdate.cartProductQuantity > 1) {
                      itemToUpdate.cartProductQuantity -= 1;
                      localStorage.setItem('allCartItems', JSON.stringify(updatedLocalCart));
                      setLocalCart(updatedLocalCart);
                    }
                    dispatch(decrement())
                  }
                }>
                  <strong>-</strong>
                </button>

                <p>{cartItem.cartProductQuantity}</p>

                <button name="increment" className="w-15" onClick={
                  () => {
                    const updatedLocalCart = [...localCart];
                    const itemToUpdate = updatedLocalCart[index];
                
                    if (itemToUpdate) {
                      itemToUpdate.cartProductQuantity += 1;
                      localStorage.setItem('allCartItems', JSON.stringify(updatedLocalCart));
                      setLocalCart(updatedLocalCart);
                    }
                    dispatch(increment())
                  }
                }>
                  <strong>+</strong>
                </button>
              </div>

              <div className="container mb-2 justify-content-end">
                <div className="row justify-content-end ">
                <Button className="col-2" size="sm" variant="danger" 
                  onClick={
                    async(event) => {
                      event.preventDefault();
                      localCartItems.splice(index, 1)
                      localStorage.setItem("allCartItems", JSON.stringify(localCartItems))
                      navigate(0)
                      dispatch(decrement(cartItem.cartProductQuantity))
                    }
                  } 
                ><FontAwesomeIcon icon="fa-solid fa-trash-can" /></Button>
                </div>
              </div>   
            </div>
        </div>       
        )) } 
      </div>

      <div className="flex-shrink-5 text-center col-lg-4 col-md-4">
        <h4>Subtotal: ${cartTotalPrice}</h4>
        <Link as={Link} to="/shop/all-products" className="text-decoration-none text-black"><h5 className="text-center mt-3 mb-3">Continue shopping</h5></Link>
        <p>Shipping & taxes calculated at checkout</p>
        <button onClick={redirectToCheckout} disabled={isLoading}>{isLoading ? "Loading..." : "Checkout"}</button>
      </div>
    </div>
  )
}

export default LocalCart; 