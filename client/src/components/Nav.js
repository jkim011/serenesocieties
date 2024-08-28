import React, { useEffect } from 'react';
import { useState } from 'react';
import {useSelector} from 'react-redux';
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
import CartCount from './cart/CartCount';
import LocalCart from '../pages/main-pages/LocalCart';
import LoggedInCartCount from './cart/LoggedInCartCount';

function NavBar(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let localCartItems = JSON.parse(localStorage.getItem("allCartItems"))
  const { cartCount } = useSelector((state) => state.cartCounter);

  if(window.location.pathname === '/') {
    return null
  }
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className=" navbar-collapse justify-content-center justify-content-evenly inline" id="navbarNav">
        <a className="d-lg-none" onClick={handleShow}>
          <img src={MenuIcon} className='menu-icon'/>
        </a>

        <Offcanvas show={show} onHide={handleClose} responsive="lg" className="off-canvas-phone">
          <Offcanvas.Header closeButton/>
          <Offcanvas.Body >
            <ul className="navbar-nav nav-width justify-content-start">
              <li className="nav-item" onClick={handleClose}>
                <Link className="nav-link" as={Link} to="/shop/all-products">Shop</Link>
              </li>
              <li className="nav-item ms-lg-5" onClick={handleClose}>
                <Link className="nav-link" as={Link} to="/lookbook">Lookbook</Link>
              </li>
              {/* <li className="nav-item" onClick={handleClose}>
                <Link className="nav-link" as={Link} to="/gallery">Gallery</Link>
              </li> */}
              <li id='profile-phone' className='nav-item' onClick={handleClose} ><Link className="nav-link" as={Link} to="/profile">Account</Link></li>
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
        <Link className="navbar-logo nav-logo" as={Link} to="/"><img src={LogoLong} className="logo-long " size='small' alt='logo'/></Link>
          <ul className="navbar-nav ml-auto nav-width justify-content-end ">
            <li className="nav-item me-lg-5" id='profile-fullscreen'>
              <Link className="nav-link" as={Link} to="/profile"><FontAwesomeIcon icon="fa-solid fa-user"></FontAwesomeIcon></Link>
            </li>
            <li className="nav-item">
              <div style={{display:"inline-flex"}}>
                <Link className="nav-link" as={Link} to="/cart"><FontAwesomeIcon icon="fa-solid fa-cart-shopping"></FontAwesomeIcon></Link>
                {!Auth.loggedIn() && localCartItems ? (
                  <div>
                    <CartCount />
                  </div>
                ) : (
                  <div>
                    {/* {loggedInCartCount} */}
                    <LoggedInCartCount />
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;