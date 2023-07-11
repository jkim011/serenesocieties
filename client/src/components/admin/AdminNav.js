import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import MenuIcon from '../../assets/icons/menu-icon.png';


function AdminNav() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    // <div className='admin-nav'>
    //   <h3 className='admin-title'>Admin Dashboard</h3>
    //   <ul defaultActiveKey="/home" className="admin-navbar d-flex justify-content-around">
    //     <Link to="/admin-dashboard"><li>Overview</li></Link>
    //     <Link to="/admin-dashboard/manage/analytics"><li>Analytics</li></Link>
    //     <Link to="/admin-dashboard/manage/orders"><li>Orders</li></Link>

    //     {/* <span style={{textDecoration:"underline"}}><h5>Manage Store</h5></span> */}
    //     <Link to="/admin-dashboard/manage/products"><li>Products</li></Link>
    //     <Link to="/admin-dashboard/manage/inventory"><li>Inventory</li></Link>
    //     <Link to="/admin-dashboard/manage/categories"><li>Categories</li></Link>
    //     <Link><li>Logout</li></Link>
    //   </ul>
    // </div>
    <div className='admin-nav'>
      <h3 className='admin-title'>Admin Dashboard</h3>
    <Navbar className=' admin-navbar' collapseOnSelect expand="lg" bg="" >
      <Nav>
      
          <Button variant='white' className="d-lg-none" onClick={handleShow}>
            <img src={MenuIcon} className='menu-icon'/>
          </Button>

          <Offcanvas show={show} onHide={handleClose} responsive="lg" placement='end'>
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto">
                <Nav.Link className='main-nav-items' as={Link} to="/shop/all-products" onClick={handleClose} >Overview</Nav.Link>
                <Nav.Link className='main-nav-items' as={Link} to="/gallery" onClick={handleClose} >Analytics</Nav.Link>
                <Nav.Link id='lookbook' className='main-nav-items' as={Link} to="/lookbook" onClick={handleClose} >Orders</Nav.Link>
                <Nav.Link id='profile' className='main-nav-items' as={Link} to="/profile" onClick={handleClose} >Products</Nav.Link>
                <Nav.Link id='profile' className='main-nav-items' as={Link} to="/profile" onClick={handleClose} >Inventory</Nav.Link>
                <Nav.Link id='profile' className='main-nav-items' as={Link} to="/profile" onClick={handleClose} >Categories</Nav.Link>
                <Nav.Link id='profile' className='main-nav-items' as={Link} to="/profile" onClick={handleClose} >Logout</Nav.Link>

              </Nav>   
            </Offcanvas.Body>
          </Offcanvas>
      </Nav>
    </Navbar>
    </div>
  )

}

export default AdminNav;