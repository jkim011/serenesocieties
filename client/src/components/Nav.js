import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <Navbar className='nav sticky-top gap-5' collapseOnSelect expand="lg" bg="light" >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className=''/>
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto ">
          <Nav.Link>Shop</Nav.Link>
          <Nav.Link as={Link} to="/">Gallery</Nav.Link>
        </Nav>
        <Navbar.Brand as={Link} to="/" className=''><img src='' className="logo " size='small' alt='logo'/></Navbar.Brand>
        <Nav className=' '> 
          <Nav.Link as={Link} to="/login">Search</Nav.Link>
          <Nav.Link as={Link} to="signup">Cart</Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar;