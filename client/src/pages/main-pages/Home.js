import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from '../../utils/queries';
import { Link } from 'react-router-dom';
import PeaceXChaosBanner from "../../assets/banners/PEACEXCHAOS_WebBanner.png";
import ProductList from '../../components/products/ProductList';

function Home() {
  const { loading, data, error } = useQuery(QUERY_PRODUCTS);
  const products = data?.products || [];

  const homeFeaturedProducts = products.filter(product => 
    product.categories.some(category => category.name === 'Natural Essence')
  );

  const soldOut = (product) => {
    for (let i = 0; i < product?.inventory.length; i++) {
      if (product?.inventory[i].quantity > 0) {
        return false; 
      }
    }
    return true;
  };
  soldOut();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className='home-container'>
      <Link to={'/shop/natural-essence'}>
        <img className='home-banner' src={PeaceXChaosBanner} alt='banner'/>
      </Link>
      
      <h4 className='category-name d-flex justify-content-center mt-5'>Featured Products</h4>
      <div className='productGrid'>
        {homeFeaturedProducts.map(product => (
          <div key={product._id} className="productCard">
            <div className={`${soldOut(product) ? 'sold-out' : 'hide'}`}>
              <p className="d-flex align-items-center m-0">SOLD OUT</p>
            </div>
            <div className="productHead">
              <Link to={`/shop/products/${product._id}`}>
                <img className="productImg" src={product.image} alt="" />
                <img className="productImg productImg2" src={product.image2} alt="" />
              </Link>
            </div>
            <div className="container">
              <div id="productDetails" className="column">
                <h5 className="col product-name fw-bold">
                  {product.name}
                </h5>
                <h5 className="col product-price">
                  ${product.price}
                </h5>
              </div>
            </div>
          </div>
        )) }
      </div>
    </div>
  )
}


export default Home;