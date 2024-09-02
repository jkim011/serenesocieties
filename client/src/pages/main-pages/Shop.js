import { useQuery } from '@apollo/client';
import React from 'react';
import ShopDropdown from '../../components/products/ShopDropdown';
import ProductList from '../../components/products/ProductList';
import PeaceXChaosBanner from "../../assets/banners/PEACEXCHAOS_WebBanner.png";

import { QUERY_PRODUCTS } from '../../utils/queries';
import { QUERY_CATEGORIES } from '../../utils/queries';

function Shop() {
  const {productLoading, productData, error} = useQuery(QUERY_PRODUCTS)
  const products = productData?.products || []

  const {loading, data} = useQuery(QUERY_CATEGORIES);

  const categories = data?.categories || []
  
  console.log("SHOP CAT", categories)
  
  if (loading) return (
    <span>Loading...</span>
  )

  return (
    <div>
      {/* <img src={PeaceXChaosBanner} alt='banner'/> */}
      <div >
        <ShopDropdown categories={categories} className="dropdown" />  
      </div>
      <ProductList products={products} />
    </div>
  )
}


export default Shop;