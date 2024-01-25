import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { paymentSucceeded, resetPaymentStatus } from '../../redux/paymentStatus';
import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }
  return stripePromise;
}

const Success = () => {
  // const dispatch = useDispatch();
  // const paymentSuccess = useSelector((state) => state.payment.paymentSuccess);
  
  // useEffect(() => {
  //   const handleWebhookResponse = (response) => {
  //     if (response.success) {
  //       dispatch(paymentSucceeded());
  //     } else {
  //       dispatch(resetPaymentStatus());
  //     }
  //   };

  //   // // Attach the event listener when the component mounts
  //   window.addEventListener('payment_intent.succeeded', handleWebhookResponse({ success: true }));
  //   // handleWebhookResponse({ success: true });

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('payment_intent.succeeded', handleWebhookResponse({ success: false }));
  //   };
  // }, [dispatch]); // Empty dependency array to ensure the effect runs only once


//////////////// blocked by cors. needs to be public link ////////////
  // useEffect(() => {
  //   // Simulate making an API request to check payment status
  //   const checkPaymentStatus = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3001/success', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         // Add any necessary request payload here
  //       });

  //       const data = await response.json();

  //       if (data.success) {
  //         // Handle the success event on the client side
  //         dispatch(paymentSucceeded());
  //       } else {
  //         dispatch(resetPaymentStatus());
  //       }
  //     } catch (error) {
  //       console.error('Error checking payment status:', error);
  //     }
  //   };

  //   // Simulate checking payment status after component mounts
  //   checkPaymentStatus();

  //   // Clean up any subscriptions or event listeners as needed
  //   return () => {
  //     // Cleanup logic here
  //   };
  // }, [dispatch]);
  /////////////////////////////////////////////
  

  /////////////////////// client secret. need to figure that out ///////
  // const paymentStatus = async () => {
  //   const stripe = await getStripe()

  //   const response = await fetch('/get-payment-intent/:paymentIntentId');
  //   const {client_secret: clientSecret} = await response.json();
  //   console.log(clientSecret, "client secret ")

  //   const {paymentIntent, error} = await stripe.confirmCardPayment(clientSecret);
  //   if (error) {
  //     console.log("Failed")
  //   } else if (paymentIntent && paymentIntent.status === 'succeeded') {
  //     console.log("Success")
  //   }
  // };
  // paymentStatus();
  /////////////////////////////////////////////////////////

  return(
    <div className="text-center mt-5">
      {/* {paymentSuccess ? ( */}
        <div>
          <h1>Thank you for your order!</h1>
          <p className="fs-5">You will recieve an email confirmation</p>
          <h3><Link as={Link} to="/shop/all-products" className="text-decoration-none text-black">Browse more products</Link></h3>
        </div>
      {/* ) : (
        <h1>Payment failed</h1>
      )} */}
      
    </div>
  )
}

export default Success;