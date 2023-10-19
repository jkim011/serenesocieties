import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function CartCount() {
    // const navigate = useNavigate()
    // const [cartCount, setCartCount] = useState(0)
    
    // const updateCartCount = () => {
    //   let localCartItems = JSON.parse(localStorage.getItem("allCartItems"))
    //   let count = 0;

    //   if(localCartItems) {
    //     for(let i = 0; i < localCartItems.length; i++) {
    //       count += localCartItems[i].cartProductQuantity;
    //     }
    //   }
    //   setCartCount(count)
    // };
    // useEffect(() => {
    //   updateCartCount();
    // }, []);

    const localCartItems = JSON.parse(localStorage.getItem("allCartItems"))
    let count = 0
    for ( let i=0; i < localCartItems.length; i++) {
      count += parseInt(localCartItems[i].cartProductQuantity)
    }

    return(
      <div>
        
        <p>{count}</p>
    
    </div>
    )
}

export default CartCount;