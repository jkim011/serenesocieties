import React from "react";
import { useState, useEffect } from "react";
import { QUERY_PRODUCTS, QUERY_SINGLE_PRODUCT } from "../../utils/queries";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, decrementByAmount} from '../../redux/cartCounter';
import {UPDATE_PRODUCT_INVENTORY} from "../../utils/mutations"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
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

const LocalCart = () => {
  const dispatch = useDispatch();
  const {loading, data, error} = useQuery(QUERY_PRODUCTS);
  const products = data?.products;
  const [queryCartProductData, { data: singleProductData, loading: singleProductLoading, error: singleProductError }] = useLazyQuery(QUERY_SINGLE_PRODUCT);
  const [queriedProduct, setQueriedProduct] = useState(null);

  const [updateProductInventory, {updateError}] = useMutation(UPDATE_PRODUCT_INVENTORY);

  const localCartItems = JSON.parse(localStorage.getItem("allCartItems"))
  console.log(localCartItems, "localCartItems")
  const [localCart, setLocalCart] = useState(JSON.parse(localStorage.getItem('allCartItems')) || []);
  const [fetchedProductData, setFetchedProductData] = useState({});

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

  const handleIncrement = async (index, cartItem) => {
    const productData = fetchedProductData[cartItem.cartProductId];
    if (productData) {
      const sizeData = productData.inventory.find(size => size._id === cartItem.cartProductSizeId);
      if (sizeData?.quantity === 0) {
        return;
      } else if (sizeData?.quantity === cartItem.cartProductQuantity) {
        return;
      } else {
        const updatedLocalCart = [...localCart];
        const itemToUpdate = updatedLocalCart[index];
        itemToUpdate.cartProductQuantity += 1;
        localStorage.setItem('allCartItems', JSON.stringify(updatedLocalCart));
        setLocalCart(updatedLocalCart);
        dispatch(increment());
      }
    } else {
      console.log("Error with product data");
    }
  };

  const handleDecrement = async (index, cartItem) => {
    const updatedLocalCart = [...localCart];
    const itemToUpdate = updatedLocalCart[index];
    if (itemToUpdate && itemToUpdate.cartProductQuantity === 1) {
      return;
    } else {
      itemToUpdate.cartProductQuantity -= 1;
      localStorage.setItem('allCartItems', JSON.stringify(updatedLocalCart));
      setLocalCart(updatedLocalCart);
      dispatch(decrement())
    }
  }

  const handleTrash = async(index, cartItem) => {
    const updatedLocalCart = [...localCart];
    updatedLocalCart.splice(index, 1)
    localStorage.setItem("allCartItems", JSON.stringify(updatedLocalCart))
    setLocalCart(updatedLocalCart);
    dispatch(decrement(cartItem.cartProductQuantity))
  }

  const [stripeError, setStripeError] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const redirectToCheckout = async () => {
    const stripe = await getStripe()
    let allItems = []
    if(localCartItems) {
      for(let i = 0; i < localCartItems.length; i++) {
        const items = 
          {
            price: localCartItems[i].cartProductPriceId,
            quantity: localCartItems[i].cartProductQuantity,
          }
        allItems.push(items)
      }
    }

    const res = await fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        allItems
      ),
    });
    const body = await res.json()
    window.location.href = body.url
    
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

  let cartTotalPrice = 0;
  for (let i = 0; i < localCartItems.length; i++) {
    let cartTotalInCents = Math.round(localCartItems[i].cartProductPrice * 100);
    cartTotalPrice += cartTotalInCents * localCartItems[i].cartProductQuantity;
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

            <div className="cart-item-details col-xl-7 col-lg-6 col flex flex-column justify-content-center">          
              <div className="flex flex-column"><p><strong>{cartItem.cartProductName}</strong></p></div>
              <p>Size: {cartItem.cartProductSize}</p>   
              <p>Price: <span className="price">${cartItem.cartProductPrice}</span></p>

              <div className="d-flex align-items-center">
                <button className="w-15" onClick={() => handleDecrement(index, cartItem)}>
                  <strong>-</strong>
                </button>

                <p className="ms-1 me-1 pt-2">{cartItem.cartProductQuantity}</p>

                <button name="increment" className="w-15" onClick={() => handleIncrement(index, cartItem)}>
                  <strong>+</strong>
                </button>
              </div>

              <Link className="position-absolute top-0 end-0 text-decoration-none text-red"
                onClick={(event) => {
                  event.preventDefault();
                  handleTrash(index, cartItem);
                }} 
              >
                <FontAwesomeIcon className="fa-xl mt-1 me-2" icon="fa-sharp fa-xmark" style={{color:"red"}}/>
              </Link>
            </div>
        </div>       
        )) } 
      </div>

      <div className="cart-checkout text-center col">
        <h4>Subtotal: ${cartTotalPrice}</h4>
        <Link as={Link} to="/shop/all-products" className="text-decoration-none text-black"><h5 className="text-center mt-3 mb-3">Continue shopping</h5></Link>
        <p>Shipping & taxes calculated at checkout</p>
        {/* <button onClick={redirectToCheckout} disabled={isLoading}>{isLoading ? "Loading..." : "Checkout"}</button> */}
        {/* <form action="http://localhost:3000/create-checkout-session" method="POST"> */} {/*this was why there was an extra {}*/}
          <button type="submit" onClick={redirectToCheckout} disabled={isLoading}>
            {isLoading ? "Loading..." : "Checkout"}
          </button>
        {/* </form> */}
      </div>
    </div>
  )
}

export default LocalCart; 