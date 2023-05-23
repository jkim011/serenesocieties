import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

import NavLogo from '../assets/logo/serene-logo-new-main.jpg';
import LogoLong from '../assets/logo/SereneLogoRevisedHoriz.png';

function NavBar() {
  const navigate = useNavigate();
  console.log(window.location.pathname);
  if(window.location.pathname === '/') {
    navigate(0);
    return null
  } else {
    return (
    <Navbar className='nav' collapseOnSelect expand="lg" bg="">
        <Navbar.Brand as={Link} to="/" className='nav-logo'><img src={LogoLong} className="logo-long " size='small' alt='logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className=''/>
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto main-nav-items">
          <Nav.Link className='mx-4' as={Link} to="/shop">Shop</Nav.Link>
          <Nav.Link className='mx-4' as={Link} to="/gallery">Gallery</Nav.Link>
          <Nav.Link className='mx-4' as={Link} to="/lookbook">Lookbook</Nav.Link>

        </Nav>   
        </Navbar.Collapse>
        <Nav.Link className='mx-4' as={Link} to="/cart">Cart</Nav.Link>

    </Navbar>
  )
    }
}

export default NavBar;