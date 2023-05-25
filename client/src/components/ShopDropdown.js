import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function ShopDropdown() {
  return (
    <DropdownButton
      className='dropdown'
      drop="end"
      variant="white"
      title="Shop by"
    >
      <Dropdown.ItemText><h5>All</h5></Dropdown.ItemText>
        <Dropdown.Item href='/shop'>All Products</Dropdown.Item>
        <Dropdown.Item href="/all-apparel">Apparel</Dropdown.Item>
        <Dropdown.Item href="/all-posters">Posters</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.ItemText><h5>Collections</h5></Dropdown.ItemText>
        <Dropdown.Item href="/natural-essence">Natural Essence</Dropdown.Item>
        <Dropdown.Item href="/halloween-special">Halloween Special</Dropdown.Item>
    </DropdownButton>
  )
}

export default ShopDropdown;