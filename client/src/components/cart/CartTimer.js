import React from "react";
import { useState, useEffect } from "react";
import { QUERY_PRODUCTS, QUERY_SINGLE_PRODUCT, QUERY_ME } from "../../utils/queries";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {UPDATE_PRODUCT_INVENTORY, REMOVE_FROM_CART} from "../../utils/mutations"
import Auth from "../../utils/auth";

const CartTimer = ({updateCart, setLoggedInCartItems, updateLoggedInCartItems}) => {
  const localCartItems = JSON.parse(localStorage.getItem("allCartItems"))
  const [localCart, setLocalCart] = useState(JSON.parse(localStorage.getItem('allCartItems')) || []);
  const [fetchedProductData, setFetchedProductData] = useState({});
  const [queryCartProductData, { data: singleProductData, loading: singleProductLoading, error: singleProductError }] = useLazyQuery(QUERY_SINGLE_PRODUCT);
  const [queriedProduct, setQueriedProduct] = useState(null);
  const [time, setTime] = useState();

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

  useEffect(() => {
    const storedEndTime = localStorage.getItem('cartTimerEndTime');
    const currentTime = Math.floor(Date.now() / 1000);
    if (storedEndTime) {
      const remainingTime = storedEndTime - currentTime;
      if (remainingTime > 0) {
        setTime(remainingTime);
      } else {
        setTime(0);
        removeAllCartItems();
      }
    } 
    else {
      const endTime = currentTime + 30;
      localStorage.setItem('cartTimerEndTime', endTime); 
      setTime(30); 
    }
  }, []);

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (time === 0) {
      removeAllCartItems();
      localStorage.removeItem('cartTimerEndTime');
    }
  }, [time]);

  if(localCartItems && localCartItems.length === 0) {
    localStorage.removeItem('cartTimerEndTime');
  }
  if(Auth.loggedIn && cartItems.length === 0) {
    localStorage.removeItem('cartTimerEndTime');
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  };

  const removeAllCartItems = async () => {  // LOOK AT BEFOREUNLOAD EVENT TO CLEAR BEFORE APP CLOSES
    localStorage.removeItem('cartTimerEndTime');
    let updatedLocalCart = [...localCart];
    if(localCartItems){ 
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
    <div>
      <h6>Due to limited stock, your cart will be held for {formatTime(time)}</h6>
      {time === 0 && <h6 style={{color:"red"}}>Time's up!</h6>}
    </div>
  )
}

export default CartTimer;