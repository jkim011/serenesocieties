import React from "react";
import { useState, useEffect } from "react";
import {Dropdown, NavDropdown} from "react-bootstrap";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";

const ShopDropdown = ({ categories }) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [route, setRoute] = useState(params.routeName || location.state?.routeName || "");
  const [category, setCategory] = useState(params.name || location.state?.category || "All Products");

  useEffect(() => {
    if (params.routeName) setRoute(params.routeName);
    if (params.name) setCategory(params.name);
  }, [params]);

  const handleCategoryChange = (routeName, name) => {
    setRoute(routeName);
    setCategory(name);
    navigate(`/shop/${routeName}`, { state: { routeName, category: name } });
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
        >      
          SHOP BY
        </Dropdown.Toggle>

        <Dropdown.Menu style={{backgroundColor: "black"}}>
          {categories &&
            categories.filter((category) => !category.isCollection).map((category) => (
              <Dropdown.Item
                key={category._id}
                className="dropdown-values dropdownItem"
                value={category.routeName}
                onClick={() => handleCategoryChange(category.routeName, category.name)}
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
                      className="dropdown-values dropdownItem"
                      value={category.routeName}
                      onClick={() => handleCategoryChange(category.routeName, category.name)}
                    >
                      {category.name}
                    </Dropdown.Item>
                  ))}     
              </Dropdown.Menu>
            </Dropdown>  
        </Dropdown.Menu>  
      </Dropdown>
      <h4 className="category-name">{category}</h4>
    </div>
  );
};

export default ShopDropdown;
