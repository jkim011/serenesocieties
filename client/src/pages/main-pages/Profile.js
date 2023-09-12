import React from 'react';
import Auth from "../../utils/auth"
import { useQuery } from '@apollo/client';
import {QUERY_ME} from "../../utils/queries"
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';


function Profile() {
  const {email} = useParams()
  const {loading, data} = useQuery(QUERY_ME ,{
    variables: {email: email}
  });
  
  const me = data?.me || []
  console.log("userdata", me)

  const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout()
  } 
  
  if(!Auth.loggedIn()){
  return (
    <div className='d-flex flex-column text-center mt-5'>
      <Link to="/login" className="text-decoration-none text-black fs-5"><p>Login to view your profile</p></Link>
      <Link to="/signup" className="text-decoration-none text-black fs-5"><p>Create an account</p></Link>
    </div>
  )
}
return(
  <div className='mt-4 text-center'>
    <h1 className='mb-4'>{me.firstName} {me.lastName}'s Profile</h1>

    <button onClick={handleLogout} className='mt-4'>Logout</button>
  </div>
  
)
}


export default Profile;