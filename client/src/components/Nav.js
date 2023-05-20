import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

import NavLogo from '../assets/logo/serene-logo-new-main.jpg';
import LogoLong from '../assets/logo/serene-logo-new-long.jpg';

function NavBar() {
  const navigate = useNavigate();
  console.log(window.location.pathname);
  if(window.location.pathname === '/') {
    navigate(0);
    return (<div></div>)
  } else {
    return (
    <Navbar className='nav' collapseOnSelect expand="lg" bg="" >
        <Navbar.Brand as={Link} to="/" className=''><img src={NavLogo} className="nav-logo " size='small' alt='logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className=''/>
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="justify-content-center">
          <Nav.Link className='mx-4' as={Link} to="/shop">Shop</Nav.Link>
          <Nav.Link className='mx-4' as={Link} to="/gallery">Gallery</Nav.Link>
          <Nav.Link className='mx-4' as={Link} to="/lookbook">Lookbook</Nav.Link>
          <Nav.Link className='mx-4' as={Link} to="/cart">Cart</Nav.Link>
        </Nav>   
        </Navbar.Collapse>
    </Navbar>
  )
    }
}

export default NavBar;