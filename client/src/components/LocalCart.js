import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const LocalCart = () => {
  const navigate = useNavigate();

  const cartItems = localStorage.getItem("allCartItems")
  const parsedCart = JSON.parse(cartItems)
  console.log(parsedCart, "parsedCart")

  const [localCart, setLocalCart] = useState(JSON.parse(localStorage.getItem('allCartItems')) || []);

  if(!parsedCart) {
    return (
      <div>
        <h5 className="text-center">Your cart is empty</h5>
        <Link as={Link} to="/shop/all-products" className="text-decoration-none text-black"><h6 className="text-center mt-3">Continue shopping</h6></Link>
      </div>
    )
  } 

  let cartTotalPrice = 0
  for ( let i=0; i < parsedCart.length; i++) {
    console.log(parsedCart[i].cartProductPrice, "forloop")
    cartTotalPrice += parseInt(parsedCart[i].cartProductPrice * parsedCart[i].cartProductQuantity)
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
      {parsedCart && parsedCart.map((cartItem, index) =>(
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
                    parsedCart.splice(index, 1)
                    localStorage.setItem("allCartItems", JSON.stringify(parsedCart))
                    navigate(0)
                  }
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