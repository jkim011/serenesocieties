import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Icon } from 'semantic-ui-react';
import MenuIcon from '../assets/icons/menu-icon.png';
import Auth from '../utils/auth';

import NavLogo from '../assets/logo/serene-logo-new-main.jpg';
import LogoLong from '../assets/logo/SereneLogoRevisedHoriz.png';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NavBar() {
  const { loading, data, error } = useQuery(QUERY_ME);
  const me = data?.me || [];

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //for local. need to make one for logged in cart
  const cartItems = JSON.parse(localStorage.getItem("allCartItems"))
  let cartItemCount = cartItems.length
  

  if(window.location.pathname === '/') {
    return null
  }
  return (
    // <Navbar className='nav justify-content-between' collapseOnSelect expand="lg" bg="" >
    //     <Navbar.Brand as={Link} to="/" id='main-nav-brand' className='nav-logo'><img src={LogoLong} className="logo-long " size='small' alt='logo'/></Navbar.Brand>
    //     <>
    //       <Button variant='white' className="d-lg-none" onClick={handleShow}>
    //         <img src={MenuIcon} className='menu-icon'/>
    //       </Button>
    //       <Offcanvas show={show} onHide={handleClose} responsive="lg">
    //         <Offcanvas.Header closeButton/>
    //         <Offcanvas.Body>
    //           <Nav className="main-nav-left">   
    //             <Nav.Link className='main-nav-items' as={Link} to="/shop/all-products" onClick={handleClose} >Shop</Nav.Link>
    //             {/* <Nav.Link className='main-nav-items' as={Link} to="/gallery" onClick={handleClose} >Gallery</Nav.Link> */}
    //             <Nav.Link id='lookbook' className='main-nav-items ' as={Link} to="/lookbook" onClick={handleClose} >Lookbook</Nav.Link>
    //             <Nav.Link id='profile-phone' className='main-nav-items' as={Link} to="/profile/" onClick={handleClose} >Account</Nav.Link>
    //           </Nav>   
    //         </Offcanvas.Body>
    //       </Offcanvas>
    //       <Nav className='main-nav-right'>
    //         <Nav.Link id='profile-fullscreen' className='main-nav-items' as={Link} to="/profile/" onClick={handleClose} ><FontAwesomeIcon icon="fa-solid fa-user"></FontAwesomeIcon></Nav.Link>
    //         <Nav.Link className='main-nav-items' as={Link} id='cart' to="/cart" onClick={handleClose}><FontAwesomeIcon icon="fa-solid fa-cart-shopping"></FontAwesomeIcon></Nav.Link>
    //       </Nav>
    //     </>
    // </Navbar>

  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <div class=" navbar-collapse justify-content-center justify-content-evenly inline" id="navbarNav">
      <a className="d-lg-none" onClick={handleShow}>
        <img src={MenuIcon} className='menu-icon'/>
      </a>

      <Offcanvas show={show} onHide={handleClose} responsive="lg" className="off-canvas-phone">
        <Offcanvas.Header closeButton/>
        <Offcanvas.Body >
          <ul class="navbar-nav nav-width justify-content-start">
            <li class="nav-item" onClick={handleClose}>
              <Link class="nav-link" as={Link} to="/shop/all-products">Shop</Link>
            </li>
            <li class="nav-item ms-lg-5" onClick={handleClose}>
              <Link class="nav-link" as={Link} to="/lookbook">Lookbook</Link>
            </li>
            {/* <li class="nav-item" onClick={handleClose}>
              <Link class="nav-link" as={Link} to="/gallery">Gallery</Link>
            </li> */}
            <li id='profile-phone' className='nav-item' onClick={handleClose} ><Link class="nav-link" as={Link} to="/profile">Account</Link></li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
      <Link class="navbar-logo nav-logo" as={Link} to="/"><img src={LogoLong} className="logo-long " size='small' alt='logo'/></Link>
        <ul class="navbar-nav ml-auto nav-width justify-content-end ">
          <li class="nav-item me-lg-5" id='profile-fullscreen'>
            <Link class="nav-link" as={Link} to="/profile"><FontAwesomeIcon icon="fa-solid fa-user"></FontAwesomeIcon></Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" as={Link} to="/cart"><FontAwesomeIcon icon="fa-solid fa-cart-shopping"></FontAwesomeIcon></Link>
            {cartItemCount}
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default NavBar;
