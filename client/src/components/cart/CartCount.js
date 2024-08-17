import React from 'react';

function CartCount() {
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