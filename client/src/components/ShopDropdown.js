import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS, QUERY_SINGLE_CATEGORY } from "../utils/queries";
import { QUERY_CATEGORIES } from "../utils/queries";
import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Divider } from "semantic-ui-react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ShopDropdown = ({ categories }) => {
  if (!categories.length) {
    console.log("no cats");
  }

  const { loading, data, error } = useQuery(QUERY_PRODUCTS);
  // console.log(error)

  const products = data?.products || [];
  console.log(products, "products shopdropdown")

  // console.log(categories.data?.categories, "categories ShopDropdown")

  //testing
  console.log("cat Props", categories[0]);
  const params = useParams()
  console.log("params", params.routeName)
  const [route, setRoute] = useState(params.routeName);
  console.log(route, "usestate");

  // useEffect(() => {
  //   setRoute(route)
  // }, [route])

  const handleChange = (e) => {
    setRoute(e.target.value)
  }
  
  // const loop = () => {
    for (let i = 0; i < products.length; i++) {
      console.log(products[i].categories, "product index", [i])
      if(products[i].categories[0].routeName == params.routeName) {
        console.log("match")
      } else {
        console.log("no match")
      }
    }
  // }
  // const filteredProducts = products.filter((product) => product.categories[i].routeName)

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <Dropdown>
      <Dropdown.Toggle
        id="dropdownBtn"
        className="dropdown page-header"
        drop="end"
        variant="white"
        title="Shop By"
        value = {route}
        onChange={handleChange} //works with regular select and options tags
        
      >      
        Shop by
      </Dropdown.Toggle>

       <Dropdown.Menu>
        {categories &&
          categories.map((category) => (
            <Dropdown.Item
              key={category._id}
              // as="button"
              className="dropdown-values dropdownItem"
              value={category.routeName}
              href={`/shop/${category.routeName}`}
              onChange={handleChange}
              onClick={() => setRoute(category.routeName)} //works with bootstrap dropdown
            >
              {category.name}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
          
      </Dropdown>
      <p>{route}</p>

      <div
        id="productCardContainer"
        className="d-flex flex-row flex-wrap justify-content-around"
      >
        {products.filter(product => product ).map(product => ( ///////////////////
            <div key={product._id} id="productCard" className="m-2">
              <div id="productHead">
                <Link to={`/shop/products/${product._id}`}>
                  <img className="productImg" src={product.image} alt="" />
                  <img
                    className="productImg productImg2"
                    src={product.image2}
                    alt=""
                  />
                </Link>
              </div>

              <div className="container ">
                <div id="productDetails" className="column">
                  <h5 className="col text-center productText">
                    {product.name}
                  </h5>
                  <h5 className="col text-center productText">
                    ${product.price}
                  </h5>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShopDropdown;
