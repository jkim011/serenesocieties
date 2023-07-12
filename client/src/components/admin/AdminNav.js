import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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


    // <div className='admin-nav'>
    //   {/* <h3 className='admin-title'>Admin Dashboard</h3> */}
    // <Navbar className='nav admin-navbar' collapseOnSelect expand="lg" bg="" >
    //   {/* <Nav> */}
    //   <Navbar.Brand>Admin Dashboard</Navbar.Brand>
    //       <Button variant='white' className="d-lg-none" onClick={handleShow}>
    //         <img src={MenuIcon} className='menu-icon'/>
    //       </Button>

    //       <Offcanvas show={show} onHide={handleClose} responsive="lg" placement='end'>
    //         <Offcanvas.Header closeButton>
    //         </Offcanvas.Header>
    //         <Offcanvas.Body>
    //           <Nav className="">
    //             <Nav.Link className='main-nav-items' as={Link} to="/admin-dashboard" onClick={handleClose} >Overview</Nav.Link>
    //             <Nav.Link className='main-nav-items' as={Link} to="/admin-dashboard/manage/analytics" onClick={handleClose} >Analytics</Nav.Link>
    //             <Nav.Link className='main-nav-items' as={Link} to="/admin-dashboard/manage/orders" onClick={handleClose} >Orders</Nav.Link>
    //             <Nav.Link className='main-nav-items' as={Link} to="/admin-dashboard/manage/products" onClick={handleClose} >Products</Nav.Link>
    //             <Nav.Link className='main-nav-items' as={Link} to="/admin-dashboard/manage/inventory" onClick={handleClose} >Inventory</Nav.Link>
    //             <Nav.Link className='main-nav-items' as={Link} to="/admin-dashboard/manage/categories" onClick={handleClose} >Categories</Nav.Link>
    //             <Nav.Link className='main-nav-items' as={Link} to="/logout" onClick={handleClose} >Logout</Nav.Link>

    //           </Nav>   
    //         </Offcanvas.Body>
    //       </Offcanvas>
    //   {/* </Nav> */}
    // </Navbar>
    // </div>


    <Navbar expand="lg" className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand>Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              Dashboard Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link className='main-nav-items' as={Link} to="/admin-dashboard" onClick={handleClose} >Overview</Nav.Link>
              <Nav.Link className='main-nav-items' as={Link} to="/admin-dashboard/manage/analytics" onClick={handleClose} >Analytics</Nav.Link>
              <Nav.Link className='main-nav-items' as={Link} to="/admin-dashboard/manage/orders" onClick={handleClose} >Orders</Nav.Link>
              <Nav.Link className='main-nav-items' as={Link} to="/admin-dashboard/manage/products" onClick={handleClose} >Products</Nav.Link>
              <Nav.Link className='main-nav-items' as={Link} to="/admin-dashboard/manage/inventory" onClick={handleClose} >Inventory</Nav.Link>
              <Nav.Link className='main-nav-items' as={Link} to="/admin-dashboard/manage/categories" onClick={handleClose} >Categories</Nav.Link>
              <Nav.Link className='main-nav-items' as={Link} to="/logout" onClick={handleClose} >Logout</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )

}

export default AdminNav;