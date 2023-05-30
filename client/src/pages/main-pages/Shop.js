import React from 'react';
import ShopDropdown from '../../components/ShopDropdown';
import SingleProduct from '../shop-sections/SingleProduct';
import ProductList from '../../components/ProductList';

function Shop() {
  return (
    <div>
      <div className='page-header'>
        <ShopDropdown className="dropdown"/>
        <h2 className='page-title'>All Products</h2>
      </div>
      {/* <SingleProduct /> */}
      <ProductList/>
    </div>
  )
}


export default Shop;