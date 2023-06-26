import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS, QUERY_SINGLE_CATEGORY } from "../utils/queries";
import { QUERY_CATEGORIES } from '../utils/queries';
import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Divider } from 'semantic-ui-react';
import { Link, useParams } from 'react-router-dom';

const ShopDropdown = () => { 

  const {loading, data, error} = useQuery(QUERY_PRODUCTS)
  console.log(error)
  // const categories = data?.categories || []
  const products = data?.products || []
  console.log(products, "products shopdropdown")
  const categories = useQuery(QUERY_CATEGORIES);
  console.log(categories.data?.categories, "categories ShopDropdown")

const Productcategories = products.categories
console.log(Productcategories, "Productcategories")
   
console.log(products.data?.categories.name, "product category shopdropdown")

  // const productCategories = products.categories || []
  // console.log(productCategories, "productCategories")

  //testing
  const [ route, setRoute ] = useState(categories.data?.categories[0].routeName)
  console.log(route, "usestate")
  // const setCurrentRoute = e => {
  //   setRoute(e.currentTarget.routeName)
  //   console.log(route)
  // }
  // useEffect(() => {
  //   console.log(route, "route")
  //   // setRoute(categories.routeName)
  // }, [route])


  if(loading) {
    return (
      <div>Loading</div>
    )
  }
  return (
    <div>
      <DropdownButton
        className='dropdown page-header'
        drop="end"
        variant="white"
        title="Shop by"
      >
        {categories.data?.categories && 
          categories.data?.categories.map((category) => (
            <Dropdown.Item key={category._id} className="dropdown-values" value={category.routeName} href={`/shop/${category.routeName}`}  >{category.name}</Dropdown.Item>
          ))
        }  
      </DropdownButton>
      <p>{route}</p>

      <div id="productCardContainer" className="d-flex flex-row flex-wrap justify-content-around">
        {products && 
          products.map((product) => (
            <div key={product._id} id="productCard" className="m-2">
              <div id="productHead">
                <Link to={`/shop/products/${product._id}`}>
                  <img className="productImg" src={product.image} alt="" />
                  <img className="productImg productImg2" src={product.image2} alt="" />
                </Link>
              </div>

              <div className="container ">
                <div id="productDetails" className="column">
                  <h5 className="col text-center productText">{product.name}</h5>
                  <h5 className="col text-center productText">${product.price}</h5>
                </div>
              </div>

            </div>
          ))} 
      </div>
    </div>
  )
}

export default ShopDropdown;