import React from "react";
import { useState, useEffect } from "react";
import { QUERY_PRODUCTS, QUERY_SINGLE_PRODUCT, QUERY_ME } from "../../utils/queries";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {UPDATE_PRODUCT_INVENTORY, REMOVE_FROM_CART} from "../../utils/mutations"
import Auth from "../../utils/auth";

const CartTimer = ({updateCart}) => {
  const localCartItems = JSON.parse(localStorage.getItem("allCartItems"))
  const [localCart, setLocalCart] = useState(JSON.parse(localStorage.getItem('allCartItems')) || []);
  const [fetchedProductData, setFetchedProductData] = useState({});
  const [queryCartProductData, { data: singleProductData, loading: singleProductLoading, error: singleProductError }] = useLazyQuery(QUERY_SINGLE_PRODUCT);
  const [queriedProduct, setQueriedProduct] = useState(null);

  const {loading, data, error} = useQuery(QUERY_ME);
  const user = data?.me || []
  let cartItems = user.cartItems || []

  const [updateProductInventory, {updateError}] = useMutation(UPDATE_PRODUCT_INVENTORY);
  const [ removeFromCart, {err} ] = useMutation(REMOVE_FROM_CART);

  useEffect(() => {
    localCart.forEach(cartItem => {
      queryCartProductData({ variables: { productId: cartItem.cartProductId } }).then(response => {
        setFetchedProductData(prevState => ({
          ...prevState,
          [cartItem.cartProductId]: response.data.product
        }));
      });
    });
  }, [singleProductData, singleProductError, queriedProduct, localCart]);

  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  const getCartTimer = () => {
    const storedCartTimer = localStorage.getItem("cartTimer");
    if (storedCartTimer) {
      return new Date(storedCartTimer);
    } else {
      const newCartTimer = new Date(Date.now() + 1 * 60 * 1000);
      localStorage.setItem("cartTimer", newCartTimer.toString());
      return newCartTimer;
    }
  };
  useEffect(() => {
    if (seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
      removeAllCartItems();
    }
  }, [seconds, minutes, hours, days]);
  useEffect(() => {
    const cartTimer = getCartTimer();
    const interval = setInterval(() => getTime(cartTimer), 1000);
    return () => clearInterval(interval);
  }, []);
  
  const getTime = (cartTimer) => {
    const time = Date.parse(cartTimer) - Date.now();
    if (time > 0) {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    } else {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      localStorage.removeItem("cartTimer");
    }
  }

  // const [time, setTime] = useState();  /////////////////// Works to continue timer when app is closed but it's inaccurate
  // useEffect(() => {
  //   const storedCartTimer = localStorage.getItem('cartTimer');
  //   const currentTime = Math.floor(Date.now() / 1000);
  //   if (storedCartTimer) {
  //     const remainingTime = storedCartTimer - currentTime;
  //     if (remainingTime > 0) {
  //       setTime(remainingTime);
  //     } else {
  //       setTime(0);
  //       removeAllCartItems();
  //     }
  //   } 
  //   else {
  //     const cartTimer = currentTime + 900;
  //     localStorage.setItem('cartTimer', cartTimer); 
  //     setTime(900); 
  //   }
  // }, []);
  // useEffect(() => {
  //   if (time > 0) {
  //     const timer = setInterval(() => {
  //       setTime(prevTime => prevTime - 1);
  //     }, 1000);
  //     return () => clearInterval(timer);
  //   } else if (time === 0) {
  //     removeAllCartItems();
  //     localStorage.removeItem('cartTimer');
  //   }
  // }, [time]);  /////////////////

  if(localCartItems && localCartItems.length === 0) {
    localStorage.removeItem("cartTimer");
  }
  if(Auth.loggedIn && cartItems.length === 0) {
    localStorage.removeItem("cartTimer");
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  };

  const removeAllCartItems = async () => {  // LOOK AT BEFOREUNLOAD EVENT TO CLEAR BEFORE APP CLOSES
    localStorage.removeItem("cartTimer");
    let updatedLocalCart = [...localCart];
    if(localCartItems && localCartItems.length > 0){ 
      for (let i = 0; i < localCartItems.length; i++) {
        const cartItem = localCartItems[i]
        try {
          await updateProductInventory({
            variables: {
              productId: cartItem.cartProductId,
              sizeId: cartItem.cartProductSizeId,
              cartProductQuantity: -cartItem.cartProductQuantity
            },
            refetchQueries: [
              {
                query: QUERY_PRODUCTS,
              }
            ]
          });

          updatedLocalCart = updatedLocalCart.filter(
            (item) => item.cartProductId !== cartItem.cartProductId
          );
          localStorage.setItem("allCartItems", JSON.stringify(updatedLocalCart));
          setLocalCart(updatedLocalCart);
          updateCart();
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      for (let i = 0; i < cartItems.length; i++) {
        try {
          await removeFromCart({
            variables: {
              userId: Auth.getProfile().data._id,
              cartId: cartItems[i]._id
            }
          });
  
          await updateProductInventory({
            variables: {
              productId: cartItems[i].cartProductId,
              sizeId: cartItems[i].cartProductSizeId,
              cartProductQuantity: -cartItems[i].cartProductQuantity
            },
            refetchQueries: [
              {
                query: QUERY_PRODUCTS,
              }
            ]
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center text-bg-dark pt-1">
      {/* <h6>Due to limited stock, your cart will be held for {formatTime(time)}</h6>
      {time === 0 && <h6 style={{color:"red"}}>Time's up!</h6>} */}
      <div className="timer">{minutes} {seconds}</div>
    </div>
  )
}

export default CartTimer;