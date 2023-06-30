import { useQuery } from '@apollo/client';
import React from 'react';
import ShopDropdown from '../../components/ShopDropdown';
import ProductList from '../../components/ProductList';
import shirt from "../../assets/clothes/testShirt.png"

import { QUERY_PRODUCTS } from '../../utils/queries';
import { QUERY_CATEGORIES } from '../../utils/queries';

function Shop() {
  // const {loading, data, error} = useQuery(QUERY_PRODUCTS)
  // const products = data?.products || []

  const {loading, data} = useQuery(QUERY_CATEGORIES);

  const categories = data?.categories || []
 
  
  console.log("SHOP CAT", categories)
  
  if (loading) return (
    <span>Loading...</span>
  )

  return (
    <div>
      <div >
        <ShopDropdown categories={categories} className="dropdown"  />  
      </div>
      {/* <ProductList products={products} /> */}
    </div>
  )
}


export default Shop;