import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

function LoggedInCartCount() {
  const { loading, data, error } = useQuery(QUERY_ME);
  const me = data?.me || [];
  let cartItems = data?.me.cartItems || []
  let loggedInCartCount = 0;
  if(cartItems) {
    for(let i = 0; i < cartItems.length; i++) {
      loggedInCartCount += cartItems[i].cartProductQuantity;
    }
  }

  return(
    <div>  
      <p>{loggedInCartCount}</p>
    </div>
  )
}

export default LoggedInCartCount;