import React from 'react';
import Nav from 'react-bootstrap/Nav';
import AdminNav from '../../components/admin/AdminNav';
import Auth from '../../utils/auth'

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

function AdminDash() {
  const { loading, data, error } = useQuery(QUERY_ME);
  const me = data?.me || [];
  if(me.isAdmin) {
    return (
      <div className='admin-container'>
        <AdminNav />
  
        <div>
          <p>basic analytics goes here</p>
        </div>
        
      </div>
    )
  } else {
    return (<p>404</p>)
  }
  
}


export default AdminDash;