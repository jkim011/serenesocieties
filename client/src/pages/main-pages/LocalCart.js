import React from "react";
import { useState, useEffect } from "react";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, decrementByAmount} from '../../redux/cartCounter';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

let stripePromise;
const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }
  return stripePromise;
}
getStripe()

const LocalCart = ({ lineItems }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {loading, data, error} = useQuery(QUERY_PRODUCTS);
  const products = data?.products;
  console.log(products, "QUERY PRODUCTS")

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
          // productId: localCartItems[i].cartProductId
        }
      allItems.push(items)
    }
  }

  const checkoutOptions = {
    lineItems: allItems,
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cart`
  }

  // const redirectToCheckout = async () => {
  //   setLoading(true);
  //   // const stripe = await getStripe()

  //   const session = await fetch('http://localhost:3000/create-checkout-session', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       lineItems: allItems,
  //     }),
  //   }).then(res => { //.then((res) => res.json());
  //     if(res.ok) return res.json()
  //     return res.json().then(json => Promise.reject(json))
  //   })
  //   .then(({url}) => {
  //     console.log(url)
  //     console.log("hi from client")
  //   })  
  //   .catch(e => {
  //     console.error(e.error)
  //   })
  const redirectToCheckout = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lineItems: allItems,
      }),
    }).then(res => { //.then((res) => res.json());
      if(res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    })
    .then(({url}) => {
      console.log(url)
      window.location = url
    })  
    .catch(e => {
      console.error(e.error)
      alert("Create stripe checkout:" + error)
    })

    // const { error } = await stripe.redirectToCheckout({
    //   sessionId: session.id,
    // });

    // const {error} = await stripe.redirectToCheckout(checkoutOptions)
    
    if(error) setStripeError(error.message);
    setLoading(false);
  }
  if(stripeError) alert(stripeError)
  if(window.location.pathname === `${checkoutOptions.successUrl}`){
    localStorage.removeItem("allCartItems")
  }
  

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
    <div className="container flex justify-content-center cartListWidth" name="cartItem">
      <div className="col">
        {localCartItems && localCartItems.map((cartItem, index) =>(
          <div key={cartItem._id} className="cartItemHeight border-top border-bottom border-dark row mb-3 position-relative" >
            <div className="col d-flex justify-content-start align-items-start">
              <img className="cartImageComponent" src={cartItem.cartProductImage}/>
            </div>

            <div className="col-xl-7 col-lg-6 col flex flex-column justify-content-center">          
              <div className="flex flex-column"><p><strong>{cartItem.cartProductName}</strong></p></div>
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

                <p className="ms-1 me-1 pt-2">{cartItem.cartProductQuantity}</p>

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

              <Link className="position-absolute top-0 end-0 text-decoration-none text-red"
                onClick={
                  async(event) => {
                    event.preventDefault();
                    localCartItems.splice(index, 1)
                    localStorage.setItem("allCartItems", JSON.stringify(localCartItems))
                    navigate(0)
                    dispatch(decrement(cartItem.cartProductQuantity))
                  }
                } 
              >
                <FontAwesomeIcon className="fa-xl mt-1 me-2" icon="fa-sharp fa-xmark" style={{color:"red"}}/>
              </Link>
            </div>
        </div>       
        )) } 
      </div>

      <div className="text-center col">
        <h4>Subtotal: ${cartTotalPrice}</h4>
        <Link as={Link} to="/shop/all-products" className="text-decoration-none text-black"><h5 className="text-center mt-3 mb-3">Continue shopping</h5></Link>
        <p>Shipping & taxes calculated at checkout</p>
        <button onClick={redirectToCheckout} disabled={isLoading}>{isLoading ? "Loading..." : "Checkout"}</button>
        {/* <form action="http://localhost:3000/create-checkout-session" method="POST">
          <button type="submit">
            Checkout
          </button>
        </form> */}
      </div>
    </div>
  )
}

export default LocalCart; 