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

function NavBar() {
  const { loading, data, error } = useQuery(QUERY_ME);
  const me = data?.me || [];
  console.log(me, "nav me")

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout()
  } 


 

  if(window.location.pathname === '/') {
    return null
  }
  return (
    <Navbar className='nav' collapseOnSelect expand="lg" bg="" >
      <Nav>
        <Navbar.Brand as={Link} to="/" className='nav-logo'><img src={LogoLong} className="logo-long " size='small' alt='logo'/></Navbar.Brand>
        {/* <Nav.Link as={Link} id='cart' to="/cart">Cart</Nav.Link> */}
        {Auth.loggedIn()?(
          <>
        {/* <Nav.Link id='logout' className='main-nav-items' as={Link} onClick={handleLogout} >Logout</Nav.Link>
        <Nav.Link id='profile' className='main-nav-items' as={Link} to="/profile" onClick={handleClose} >Profile</Nav.Link> */}
        </>):
        (<></>)
        }
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

                
                {Auth.loggedIn()? (
                  <>
                     <Nav.Link className='main-nav-items' as={Link} to="/shop/all-products" onClick={handleClose} >Shop</Nav.Link>
                     <Nav.Link className='main-nav-items' as={Link} to="/gallery" onClick={handleClose} >Gallery</Nav.Link>
                     <Nav.Link id='lookbook' className='main-nav-items' as={Link} to="/lookbook" onClick={handleClose} >Lookbook</Nav.Link>
                     <Nav.Link id='profile' className='main-nav-items' as={Link} to="/profile" onClick={handleClose} >Profile</Nav.Link>
                     <Nav.Link as={Link} id='cart' to="/cart">Cart</Nav.Link>
                     <Nav.Link id='logout' className='main-nav-items' as={Link} onClick={handleLogout} >Logout</Nav.Link>
                     
                     {/* <Nav.Link as={Link} className='' id='admin' to="/admin-dashboard">Admin</Nav.Link>               */}
                   
                     
                     
                     </>
                ) :(
                  <>
                     <Nav.Link className='main-nav-items' as={Link} to="/shop/all-products" onClick={handleClose} >Shop</Nav.Link>
                     <Nav.Link className='main-nav-items' as={Link} to="/gallery" onClick={handleClose} >Gallery</Nav.Link>
                     <Nav.Link id='lookbook' className='main-nav-items' as={Link} to="/lookbook" onClick={handleClose} >Lookbook</Nav.Link>
                     <Nav.Link id='lookbook' className='main-nav-items' as={Link} to="/login" onClick={handleClose}>Login</Nav.Link>
                     </>
                )
              }
             

              </Nav>   
            </Offcanvas.Body>
          </Offcanvas>
        </>
      </Nav>
    </Navbar>

    

  )
}

export default NavBar;
