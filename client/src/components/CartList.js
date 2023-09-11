import React from "react";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_FROM_CART } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Button from "react-bootstrap/Button"
import { ADD_TO_CART } from "../utils/mutations";

import  "../styles/cartList.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

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
        <button>Checkout</button>
      </div>
    </div>

  )
}

export default CartList;