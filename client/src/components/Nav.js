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

import NavLogo from '../assets/logo/serene-logo-new-main.jpg';
import LogoLong from '../assets/logo/SereneLogoRevisedHoriz.png';


function NavBar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if(window.location.pathname === '/') {
    navigate(0);
    return null
  }
  return (
    <Navbar className='nav' collapseOnSelect expand="lg" bg="" >
      <Nav>
        <Navbar.Brand as={Link} to="/" className='nav-logo'><img src={LogoLong} className="logo-long " size='small' alt='logo'/></Navbar.Brand>
        <Nav.Link as={Link} id='cart' to="/cart">Cart</Nav.Link>

        <>
          <Button variant='white' className="d-lg-none" onClick={handleShow}>
            <img src={MenuIcon} className='menu-icon'/>
          </Button>

          <Offcanvas show={show} onHide={handleClose} responsive="lg">
            <Offcanvas.Header closeButton>
              {/* <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title> */}
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto main-nav-items">
                <Nav.Link className='main-nav-items' as={Link} to="/shop/all-products" onClick={handleClose} >Shop</Nav.Link>
                <Nav.Link className='main-nav-items' as={Link} to="/gallery" onClick={handleClose} >Gallery</Nav.Link>
                <Nav.Link id='lookbook' className='main-nav-items' as={Link} to="/lookbook" onClick={handleClose} >Lookbook</Nav.Link>
                <Nav.Link id='profile' className='main-nav-items' as={Link} to="/admin-dashboard" onClick={handleClose} >Profile</Nav.Link>
              </Nav>   
            </Offcanvas.Body>
          </Offcanvas>
        </>
      </Nav>
    </Navbar>

    

  )
}

export default NavBar;
