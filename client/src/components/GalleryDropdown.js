import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function GalleryDropdown() {
  return (
    <DropdownButton
      className='dropdown'
      drop="end"
      variant="white"
      title="View by"
    >
      <Dropdown.Item href="">Art Gallery</Dropdown.Item>
      <Dropdown.Item href="">Archive</Dropdown.Item>
    </DropdownButton>
  )
}

export default GalleryDropdown;