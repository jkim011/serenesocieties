import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function ShopDropdown() {
  return (
    <div>
      <Dropdown className='dropdown'>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
          Shop by
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          <Dropdown.ItemText><h5>All</h5></Dropdown.ItemText>
          <Dropdown.Item href='/shop'>All Products</Dropdown.Item>
          <Dropdown.Item href="/all-apparel">Apparel</Dropdown.Item>
          <Dropdown.Item href="/all-posters">Posters</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.ItemText><h5>Collections</h5></Dropdown.ItemText>
          <Dropdown.Item href="/natural-essence">Natural Essence</Dropdown.Item>
          <Dropdown.Item href="/halloween-special">Halloween Special</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    </div>
  )
}

export default ShopDropdown;