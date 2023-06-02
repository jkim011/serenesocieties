import { useQuery } from '@apollo/client';
import React from 'react';
import ShopDropdown from '../../components/ShopDropdown';
import ProductList from '../../components/ProductList';

import { QUERY_PRODUCTS } from '../../utils/queries';

function Shop() {
  const {loading, data} = useQuery(QUERY_PRODUCTS)
  const products = data?.products || []
  console.log(products, "in shop.js")

  return (
    <div>
      <div className='page-header'>
        <ShopDropdown className="dropdown"/>
        <h2 className='page-title'>All Products</h2>
      </div>
      <ProductList products={products} />
    </div>
  )
}


export default Shop;