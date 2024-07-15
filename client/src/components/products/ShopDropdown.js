import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS, QUERY_SINGLE_CATEGORY } from "../../utils/queries";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useState, useEffect } from "react";
import {Dropdown, NavDropdown} from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Divider } from "semantic-ui-react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ShopDropdown = ({ categories }) => {
  const params = useParams()

  const [route, setRoute] = useState(params.routeName);

  const handleChange = (e) => {
    setRoute(e.target.value)
  }

  return (
    <div className="shop-dropdown">
      <Dropdown>
        <Dropdown.Toggle
          style={{backgroundColor: "black", color: "white"}}
          id="dropdownBtn"
          className="dropdown page-header"
          drop="end"
          variant="white"
          title="Shop By"
          value = {route}
          // onChange={handleChange} //works with regular select and options tags
        >      
          Shop by
        </Dropdown.Toggle>

        <Dropdown.Menu style={{backgroundColor: "black"}}>
          {categories &&
            categories.filter((category) => !category.isCollection).map((category) => (
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

            <Dropdown className="collections-dropdown">
              <Dropdown.Toggle as="div" className="collections-toggle">
                Collections
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ backgroundColor: "black" }}>
                {categories &&
                  categories.filter((category) => category.isCollection).map((category) => (
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
        </Dropdown.Menu>  
      </Dropdown>
    </div>
  );
};

export default ShopDropdown;
