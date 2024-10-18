import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, decrementByAmount} from '../../redux/cartCounter';
import { QUERY_SINGLE_PRODUCT } from "../../utils/queries";
import { QUERY_ME } from "../../utils/queries";
import {ADD_TO_CART, ADD_TO_CART_QUANTITY, UPDATE_PRODUCT_INVENTORY} from "../../utils/mutations"

import Auth from "../../utils/auth";
import "../../styles/singleProduct.css"
import LocalCart from "../main-pages/LocalCart";

function SingleProduct({updateCart}) {
  const { productId } = useParams();
  const product = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { productId: productId }
  });
  const inventory = product.data?.product.inventory

  const localCartItems = JSON.parse(localStorage.getItem("allCartItems"))

  const me = useQuery(QUERY_ME);
  let loggedInCartItems = me.data?.me.cartItems

  const [addToCartQuantity, {addQuantError}] = useMutation(ADD_TO_CART_QUANTITY)

  const [size, setSize] = useState("")
  const handleSizeSelect = (size, sizeId, priceId) => {
    setSize(`${size},${sizeId},${priceId}`);
  };
  const sizeFields = size.split(',')
  const sizeName = sizeFields[0]
  const sizeId = sizeFields[1]
  const sizePriceId = sizeFields[2]

  const [addCartItem, {error}] = useMutation(ADD_TO_CART)
  const [updateProductInventory, {err}] = useMutation(UPDATE_PRODUCT_INVENTORY);

  const [cartBtnText, setCartBtnText] = useState("ADD TO CART")
  const showCheckMark = () => {
    setCartBtnText("Adding")
    setTimeout(removeCheckMark, 1500)
  }
  const removeCheckMark = () => {
    setCartBtnText("ADD TO CART")
  }

  // // Starts cart timer
  // const [days, setDays] = useState(0);
  // const [hours, setHours] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);
  
  // const cartTimer = new Date(Date.now() + 15 * 60 * 1000);
  // const getCartTimer = () => {
  //   const storedCartTimer = localStorage.getItem("cartTimer");
  //   if (storedCartTimer) {
  //     return new Date(storedCartTimer);
  //   } else {
  //     const newCartTimer = new Date(Date.now() + 15 * 60 * 1000);
  //     localStorage.setItem("cartTimer", newCartTimer.toString());
  //     return newCartTimer;
  //   }
  // };

  // const getTime = () => {
  //   const time = Date.parse(cartTimer) - Date.now();
  //   if (time > 0) {
  //     setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
  //     setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
  //     setMinutes(Math.floor((time / 1000 / 60) % 60));
  //     setSeconds(Math.floor((time / 1000) % 60));
  //   } else {
  //     setDays(0);
  //     setHours(0);
  //     setMinutes(0);
  //     setSeconds(0);
  //     localStorage.removeItem("cartTimer"); 
  //   }
  // };

  // useEffect(() => {
  //   const cartTimer = getCartTimer();
  //   const interval = setInterval(() => getTime(cartTimer), 1000);
  //   return () => clearInterval(interval);
  // }, []);

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
  //     }
  //   } else {
  //     const cartTimer = currentTime + 30;
  //     localStorage.setItem('cartTimer', cartTimer); 
  //     setTime(30); 
  //   }
  // }, [localCartItems]);
  // useEffect(() => { //still needs this for time to go correctly and not too fast when not on cart pg
  //   if (time > 0) {
  //     const timer = setInterval(() => {
  //       setTime(prevTime => prevTime - 1);
  //     }, 1000);
  //     return () => clearInterval(timer);
  //   } else if (time === 0) {
  //     localStorage.removeItem('cartTimer');
  //   }
  // }, [time]);  ///////////////

////////// cart count /////////////////
  let count = 0
  if(localCartItems) {
    for ( let i=0; i < localCartItems.length; i++) {
      count += parseInt(localCartItems[i].cartProductQuantity)
    }
  }

  const dispatch = useDispatch();

  const handleAddToCart = async (event) => {
    event.preventDefault();
    const cartProductId = productId;
    const cartProductSizeId = sizeId;
    const duplicateCartItem = loggedInCartItems.find(loggedInCartItem => loggedInCartItem.cartProductId === cartProductId && loggedInCartItem.cartProductSizeId === cartProductSizeId)

    if(duplicateCartItem) {
      try {
        await addToCartQuantity({
          variables: {
            userId: Auth.getProfile().data._id,
            cartId: duplicateCartItem._id,
            cartProductQuantity: 1
          },
          refetchQueries: [
            {
              query: QUERY_ME,
              variables: {
                cartProductId
              }
            }
          ]
        });
        // await updateProductInventory({ ///UPDATE AFTER USER GOES TO CHECKOUT
        //   variables: {
        //     productId: cartProductId,
        //     sizeId: cartProductSizeId,
        //     cartProductQuantity: 1
        //   },
        //   refetchQueries: [
        //     {
        //       query: QUERY_SINGLE_PRODUCT,
        //       variables: {
        //         productId
        //       }
        //     }
        //   ]
        // })
        setSize("");
        showCheckMark();
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        await addCartItem({
          variables: {
            userId: Auth.getProfile().data._id,
            cartProductId,
            cartProductName: product.data?.product.name,
            cartProductSizeId,
            cartProductSize: sizeName,
            cartProductImage: product.data?.product.image,
            cartProductPrice: product.data?.product.price,
            cartProductPriceId: sizePriceId,
            cartProductQuantity: 1
          },
          refetchQueries: [
            {
              query: QUERY_ME,
              variables: {
                cartProductId
              }
            }
          ],
        });
        // await updateProductInventory({ ///UPDATE AFTER USER GOES TO CHECKOUT
        //   variables: {
        //     productId: cartProductId,
        //     sizeId: cartProductSizeId,
        //     cartProductQuantity: 1
        //   },
        //   refetchQueries: [
        //     {
        //       query: QUERY_SINGLE_PRODUCT,
        //       variables: {
        //         productId
        //       }
        //     }
        //   ]
        // })
        setSize("");
        showCheckMark();
      } catch(error){
        console.log(error)
      }
    }
  }
  console.log(loggedInCartItems)

  let outOfSize = false
  for(let i = 0; i < localCartItems.length; i++) {
    console.log(localCartItems[i].cartProductQuantity, "local cart quant")
    console.log(localCartItems[i].cartProductPriceId, "local cart priceId")
    if(sizePriceId === localCartItems[i].cartProductPriceId) {
      // window.alert(`That was the last of size ${sizeName}`)
      outOfSize = true
    } else {
      console.log(false)
    }
  }

  let existingLocalCartItems = JSON.parse(localStorage.getItem("allCartItems"))
  const handleAddToCartLocal = async (event) =>{
    event.preventDefault();
    if(existingLocalCartItems == null) existingLocalCartItems = []

    const cartProductId = productId;
    const cartProductSizeId = sizeId;
    const duplicateCartItem = existingLocalCartItems.find(existingLocalCartItem => existingLocalCartItem.cartProductId === cartProductId && existingLocalCartItem.cartProductSizeId === cartProductSizeId)

    if(duplicateCartItem) {
      try {
        duplicateCartItem.cartProductQuantity += 1
      } catch (err) {
        console.log(err)
      }
    } else {
      let cartItem = {
        'cartProductId': productId, 
        "cartProductName": product.data?.product.name, 
        "cartProductSizeId": sizeId, 
        "cartProductSize": sizeName, 
        "cartProductImage": product.data?.product.image, 
        "cartProductPrice": product.data?.product.price,
        "cartProductPriceId": sizePriceId,
        "cartProductQuantity": 1
      }
      localStorage.setItem("cartItem", JSON.stringify(cartItem));
      existingLocalCartItems.push(cartItem);   
    }
    localStorage.setItem("allCartItems", JSON.stringify(existingLocalCartItems));
    // try {
    //   await updateProductInventory({ ///UPDATE AFTER USER GOES TO CHECKOUT
    //     variables: {
    //       productId,
    //       sizeId,
    //       cartProductQuantity: 1
    //     },
    //     refetchQueries: [
    //       {
    //         query: QUERY_SINGLE_PRODUCT,
    //         variables: {
    //           productId
    //         }
    //       }
    //     ],
    //   })
      dispatch(increment())
      setSize("");
      showCheckMark();
      // updateCart();
    // } catch (error) {
    //   console.log(error);
    // }
  }

  let productCollectionName 
  for (let i = 0; i < product.data?.product.categories.length; i++) {
    if(product.data?.product.categories[i].isCollection === true) {
      productCollectionName = product.data?.product.categories[i].name
    }
  }
  return (
    <div className="single-product-container">
      <div className="image-container">
        <Carousel className="product-image" interval={null} variant="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={product.data?.product.image}
              alt="image1"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={product.data?.product.image2}
              alt="image2"
            />
          </Carousel.Item>
        </Carousel>

        <div className="product-price-sm"> {/*For phone screens and vertical tablets*/}
          <h3>{product.data?.product.name}</h3>
          <h3 className="price">${product.data?.product.price}</h3>
          {productCollectionName ? (
            <h6 className="product-collection-name">{productCollectionName} Collection</h6>
          ) : (
            null
          )}
        </div>
        
        <form className="product-btns">
          <div className="size-selector">
            {inventory?.map(stock => (
              <div
                key={stock._id}
                className={`size-box ${sizeName === stock.size ? "selected" : ""} ${stock.quantity === 0 ? "disabled" : ""}`}
                onClick={() => stock.quantity > 0 && handleSizeSelect(stock.size, stock._id, stock.priceId)}
              >
                {stock.size}
              </div>
            ))}
          </div>
          {outOfSize===true ? <h5 className="mt-1 fst-italic">Sorry, that's all of size {sizeName}</h5> : <></>}
          <div className="add-to-cart">
            {Auth.loggedIn() ? (
              <button id="addCartBtn" className= "cart-btn" onClick={handleAddToCart} disabled={size === "" || cartBtnText === "Adding"}>{cartBtnText}</button>
            ):(
              <button id="addCartLocalBtn" className="cart-btn" onClick={handleAddToCartLocal} disabled={size === "" || cartBtnText === "Adding" || outOfSize === true}>{cartBtnText}</button>
            )}
          </div> 
        </form>
      </div>

      <div className="product-info ms-lg-4">
        <div className="product-price-lg">
          <h3>{product.data?.product.name}</h3>
          <h3 className="price">${product.data?.product.price}</h3>
          {productCollectionName ? (
            <h6 className="product-collection-name">{productCollectionName} Collection</h6>
          ) : (
            null
          )}
        </div>

        <div className="product-description mt-5">
          <label>Item Description</label>
          <p>{product.data?.product.description}</p>
        </div>
      </div>  
    </div>
  )
}

export default SingleProduct;