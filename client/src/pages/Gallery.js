import React from 'react';
import NavBar from '../components/Nav';
import Dropdown from 'react-bootstrap/Dropdown';

function Gallery() {
  return (
    <div>
      {/* <NavBar /> */}
      <Dropdown>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
          View by
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          <Dropdown.Item href="#/action-1">Art Gallery</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Archive</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      Gallery
    </div>
  )
}


export default Gallery;