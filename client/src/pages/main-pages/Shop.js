import React from 'react';
import ShopDropdown from '../../components/ShopDropdown';
import SingleProduct from '../shop-sections/SingleProduct';

function Shop() {
  return (
    <div>
      <div className='page-header'>
        <ShopDropdown className="dropdown"/>
        <h2 className='page-title'>All Products</h2>
      </div>
      <SingleProduct />
    </div>
  )
}


export default Shop;