import React, { useState, useEffect, useRef, useCallback } from "react";
import { QUERY_ME, QUERY_PRODUCTS, QUERY_SINGLE_PRODUCT } from "../../utils/queries";
import { ADD_TO_CART, REMOVE_FROM_CART, ADD_TO_CART_QUANTITY, REMOVE_CART_QUANTITY, UPDATE_PRODUCT_INVENTORY } from "../../utils/mutations";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js"

import  "../../styles/cartList.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

let stripePromise;
const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }
  return stripePromise;
}

const CartList = () => {
  const navigate = useNavigate()
    
  const {loading, data, error} = useQuery(QUERY_ME);
  const user = data?.me || []
  let cartItems = data?.me.cartItems || []
  console.log(cartItems, "cartItems")

  const {productsLoading, productsData, productsError} = useQuery(QUERY_PRODUCTS);
  const products = data?.products;

  const [queryCartProductData, { data: singleProductData, error: singleProductError }] = useLazyQuery(QUERY_SINGLE_PRODUCT);
  const [fetchedProductData, setFetchedProductData] = useState({});

  const [removeFromCart, {rmvError}] = useMutation(REMOVE_FROM_CART)
  const [addCartItem, {err}] = useMutation(ADD_TO_CART)

  const [addToCartQuantity, {addQuantError}] = useMutation(ADD_TO_CART_QUANTITY)
  const [removeCartQuantity, {rmvQuantError}] = useMutation(REMOVE_CART_QUANTITY)
  const [updateProductInventory, {updateInvError}] = useMutation(UPDATE_PRODUCT_INVENTORY)
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  };

  const [time, setTime] = useState(60); 
  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (time === 0) {
      removeAllCartItems();
    }
  }, [time]);

  const removeAllCartItems = async () => {
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
  };

  let localCartItems = JSON.parse(localStorage.getItem("allCartItems"))
  console.log(localCartItems, "from localStorage")
 
  const hasRun = useRef(false)
  useEffect(() => {
    const combineCarts = async () => {    
      if(localStorage.getItem("allCartItems")) {
        for(let i = 0; i < localCartItems.length; i++) {
          if(cartItems.find(cartItem => cartItem.cartProductId === localCartItems[i].cartProductId && cartItem.cartProductSizeId === localCartItems[i].cartProductSizeId)) {
            try {
              await addToCartQuantity({
                variables: {
                  userId: Auth.getProfile().data._id,
                  cartId: cartItems[i]._id,
                  cartProductQuantity: localCartItems[i].cartProductQuantity
                }
              });
            } catch (addQuantError) {
              console.log(addQuantError)
            }
          } else {
            try {
              await addCartItem({
                variables: {
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
                refetchQueries: [
                  {
                    query: QUERY_ME,/////cartcount not updating after unless i go to cart pg
                  },
                  {
                    query: QUERY_PRODUCTS,
                    variables: { products }
                  }
                ],
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
    if (!hasRun.current) {
      combineCarts()
      hasRun.current = true
    }
  }, [])

  useEffect(() => {
    cartItems.forEach(cartItem => {
      queryCartProductData({ variables: { productId: cartItem.cartProductId } }).then(response => {
        setFetchedProductData(prevState => ({
          ...prevState,
          [cartItem.cartProductId]: response.data.product
        }));
      });
    });
  }, [cartItems, singleProductData, singleProductError]);

  const handleIncrement = async (cartItem) => {
    const productData = fetchedProductData[cartItem.cartProductId];
    if (productData) {
      const sizeData = productData.inventory.find(size => size._id === cartItem.cartProductSizeId);
      if (sizeData?.quantity === 0) {
        return;
      } else {
        try {
          await addToCartQuantity({
            variables: {
              userId: Auth.getProfile().data._id,
              cartId: cartItem._id,
              cartProductQuantity: 1
            }
          });
          await updateProductInventory({
            variables: {
              productId: cartItem.cartProductId,
              sizeId: cartItem.cartProductSizeId,
              cartProductQuantity: 1
            },
            refetchQueries: [
              { query: QUERY_PRODUCTS }
            ]
          });
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      console.log("Error with product data");
    }
  }

  const handleDecrement = async (cartItem) => {
    if(cartItem.cartProductQuantity === 1) {
      return;
    } else {
      try {
        await removeCartQuantity({
          variables: {
            userId: Auth.getProfile().data._id,
            cartId: cartItem._id
          }
        })
        await updateProductInventory({
          variables: {
            productId: cartItem.cartProductId,
            sizeId: cartItem.cartProductSizeId,
            cartProductQuantity: -1
          },
          refetchQueries: [
            {
              query: QUERY_PRODUCTS,
              variables: {
                products
              }
            }
          ]
        })
      } catch(rmvQuantError) {
        console.log(rmvQuantError)
      }
    }
  }

  const handleTrash = async (cartItem) => {
    try {
      await removeFromCart({
        variables: {
          userId: Auth.getProfile().data._id,
          cartId: cartItem._id
        }
      })
      await updateProductInventory({
        variables: {
          productId: cartItem.cartProductId,
          sizeId: cartItem.cartProductSizeId,
          cartProductQuantity: -cartItem.cartProductQuantity
        },
        refetchQueries: [
          {
            query: QUERY_PRODUCTS,
            variables: {
              products
            }
          }
        ]
      })
    } catch(err) {
      console.log(err)
    }
  }

  const [stripeError, setStripeError] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const redirectToCheckout = async () => {
    const stripe = await getStripe()
    let allItems = []
    for(let i = 0; i < cartItems.length; i++) {
      const items = 
        {
          price: cartItems[i].cartProductPriceId,
          quantity: cartItems[i].cartProductQuantity,
        }
      allItems.push(items)
    }
    console.log(allItems, "ALL ITEMS ")

    const res = await fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        allItems
      ),
    })//.then((res) => res.json())
    // .then(res => { 
    //   if(res.ok) return res.json()
    //   return res.json().then(json => Promise.reject(json))
    // }) 
    const body = await res.json()
    window.location.href = body.url
    // .then(({url}) => {
    //   console.log(url)
    //   window.location = url
    // })  
    // .then(() => {
    //   stripe.redirectToCheckout(checkoutOptions)
    // }) 
    // .catch(e => {
    //   console.error(e.error)
    // })

    // const { error } = await stripe.redirectToCheckout({
    //   sessionId: session.id,
    // });

    // const {error} = await stripe.redirectToCheckout(checkoutOptions)
    
    if(error) setStripeError(error.message);
    setLoading(false);
  }
  if(stripeError) alert(stripeError)

  // To calculate cart total
  let cartTotalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let cartTotalInCents = Math.round(cartItems[i].cartProductPrice * 100);
    cartTotalPrice += cartTotalInCents * cartItems[i].cartProductQuantity;
  }
  cartTotalPrice = cartTotalPrice / 100;
  if(cartTotalPrice === 0) {
    return (
      <div>
        <h5 className="text-center">Your cart is empty</h5>
        <Link as={Link} to="/shop/all-products" className="text-decoration-none text-black"><h6 className="text-center mt-3">Continue shopping</h6></Link>
      </div>
    )
  }

  console.log(user, "alskdfjjfkldsa;laskdfj")


  return (
    <div className="container flex justify-content-center cartListWidth" name="cartItem">
      <div>
      <h6>Due to limited stock, your cart will be held for {formatTime(time)}</h6>
        {time === 0 && <h2 style={{color:"red"}}>Time's up!</h2>}
      </div>
      <div className="col">
        {cartItems && cartItems.map((cartItem) =>(
          <div key={cartItem._id} className="cartItemHeight border-top border-bottom border-dark row mb-3 position-relative" >
            <div className="col d-flex justify-content-start align-items-start">
              <img className="cartImageComponent" src={cartItem.cartProductImage}/>
            </div>

            <div className="col-xl-7 col-lg-6 col flex flex-column justify-content-center">          
              <p><strong>{cartItem.cartProductName}</strong></p>
              <p>Size: {cartItem.cartProductSize}</p> 
              <p>Price: ${cartItem.cartProductPrice}</p>

              <div className="d-flex align-items-center">
                
                <button className="w-15" onClick={(event) => {
                  event.preventDefault();
                  handleDecrement(cartItem);
                }}>
                  <strong>-</strong>
                </button>

                <p className="ms-1 me-1 pt-2">{cartItem.cartProductQuantity}</p>

                <button className="w-15" onClick={(event) => {
                  event.preventDefault();
                  handleIncrement(cartItem);
                }}>
                  <strong>+</strong>
                </button>     
              </div>

              <Link className="position-absolute top-0 end-0 text-decoration-none text-red" size="sm" onClick={(event) => {
                event.preventDefault();
                handleTrash(cartItem)
              }}>
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