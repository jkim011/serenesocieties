import React from 'react';
import Nav from 'react-bootstrap/Nav';
import AdminNav from '../../components/admin/AdminNav';

function AdminDash() {
  return (
    <div className='admin-container'>
      <AdminNav />

      <div>
        <p>basic analytics goes here</p>
      </div>
      
    </div>
  )
}


export default AdminDash;