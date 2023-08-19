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
    <Link to="/login"><p>Login to view your Profile!</p></Link>
  )
}
return(
  <section className='mt-4 '>
  <h1>{me.firstName} {me.lastName}'s Profile</h1>

  <button onClick={handleLogout}>Logout</button>
  </section>
  
)
}


export default Profile;