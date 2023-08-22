import React from "react";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LocalCart = () => {

    const cartItems = localStorage.getItem("allCartItems")
    // console.log(cartItems)
     const parsedCart = JSON.parse(cartItems)
    console.log(parsedCart, "parsedCart")

    let cartTotalPrice = 0
    for ( let i=0; i < parsedCart.length; i++) {
        console.log(parsedCart[i].cartProductPrice, "forloop")
        cartTotalPrice += parseInt(parsedCart[i].cartProductPrice)
    }
    console.log(cartTotalPrice)

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
           
          {parsedCart && parsedCart.map((cartItem) =>(
            <div key={cartItem._id} className="border row mb-2" >
              <div className="col-4 border">
                <img className="cartImageComponent" src={cartItem.cartProductImage}/>
              </div>
  
              <div className="col-8 cartItemDetails">          
                <p><strong>{cartItem.cartProductName}</strong> - {cartItem.cartProductSize}</p>
                
                <p>${cartItem.cartProductPrice}</p>
            
  
                <div className="container  mb-2  justify-content-end">
                  <div className="row justify-content-end ">
                  <Button className="col-2" size="sm" variant="danger" 
                  onClick={
                    localStorage.removeItem("cartItem")
                  }
                  ><FontAwesomeIcon icon="fa-solid fa-trash-can" /></Button>
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
export default LocalCart; 