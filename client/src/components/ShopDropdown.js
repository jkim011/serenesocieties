import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function ShopDropdown() {
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
          Shop by
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          <Dropdown.Item href='/shop'>All Products</Dropdown.Item>
          <Dropdown.Item href="/all-apparel">All Apparel</Dropdown.Item>
          <Dropdown.Item href="/all-posters">All Posters</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.ItemText>Collections</Dropdown.ItemText>
          <Dropdown.Item href="/natural-essence">Natural Essence</Dropdown.Item>
          <Dropdown.Item href="/halloween-special">Halloween Special</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    </div>
  )
}

export default ShopDropdown;