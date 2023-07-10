import React from 'react';
import { Link } from 'react-router-dom';

function AdminNav() {

  return (
    <div className='admin-nav'>
      <h3 className='admin-title'>Admin Dashboard</h3>
      <ul defaultActiveKey="/home" className="admin-navbar d-flex justify-content-around">
        <Link to="/admin-dashboard"><li>Overview</li></Link>
        <Link to="/admin-dashboard/manage/analytics"><li>Analytics</li></Link>
        <Link to="/admin-dashboard/manage/orders"><li>Orders</li></Link>

        <span style={{textDecoration:"underline"}}><h5>Manage Store</h5></span>
        <Link to="/admin-dashboard/manage/products"><li>Products</li></Link>
        <Link to="/admin-dashboard/manage/inventory"><li>Inventory</li></Link>
        <Link to="/admin-dashboard/manage/categories"><li>Categories</li></Link>
        <Link><li>Logout</li></Link>
      </ul>
    </div>
  )

}

export default AdminNav;