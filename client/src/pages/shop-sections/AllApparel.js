import React from 'react';
import ShopDropdown from '../../components/ShopDropdown';
import SingleProduct from './SingleProduct';

function AllApparel() {
  return (
    <div>
      <div className='page-header'>
        <ShopDropdown className="dropdown"/>
        <h2 className='page-title'>All Apparel</h2>
      </div>

    </div>
  )
}


export default AllApparel;