import React from 'react';
import Nav from 'react-bootstrap/Nav';

function AdminNav() {

  return (
    <div className='admin-nav'>
      <h2>Admin Dashboard</h2>
      <Nav defaultActiveKey="/home" className="admin-navbar">
        <Nav.Link href="/admin-dashboard">Overview</Nav.Link>
        <Nav.Link href="/admin-dashboard/manage/products">Products</Nav.Link>
        <Nav.Link href="/admin-dashboard/manage/inventory">Inventory</Nav.Link>
        <Nav.Link href="/admin-dashboard/manage/categories">Categories</Nav.Link>
        <Nav.Link href="/admin-dashboard/manage/orders">Orders</Nav.Link>
        <Nav.Link href="/admin-dashboard/manage/analytics">Analytics</Nav.Link>
      </Nav>
    </div>
  )

}

export default AdminNav;