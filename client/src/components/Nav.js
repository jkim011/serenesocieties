import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

import NavLogo from '../assets/logo/serene-logo-new-main.jpg';
import LogoLong from '../assets/logo/SereneLogoRevisedHoriz.png';

function NavBar() {
  
  const navigate = useNavigate();
  console.log(window.location.pathname);
  const [visible, setVisible] = useState(false)
  
  if(window.location.pathname === '/') {
    navigate(0);
    return null
  } else {
    return (
      <Navbar className='nav' collapseOnSelect expand="lg" bg="" style={{marginBottom:"50px"}}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className=''/>

        
        
        <Nav>
        <Navbar.Brand as={Link} to="/" className='nav-logo'><img src={LogoLong} className="logo-long " size='small' alt='logo'/></Navbar.Brand>
        <Nav.Link as={Link} id='cart' to="/cart">Cart</Nav.Link>

          
        </Nav>

          <Navbar.Collapse  id="responsive-navbar-nav">
            <Nav className="me-auto main-nav-items">

              <Nav.Link className='' as={Link} to="/shop">Shop</Nav.Link>
              <Nav.Link className='' as={Link} to="/gallery">Gallery</Nav.Link>
              <Nav.Link className='' as={Link} to="/lookbook">Lookbook</Nav.Link>

            </Nav>   
          </Navbar.Collapse>


      </Navbar>
    )
  }
}

export default NavBar;
