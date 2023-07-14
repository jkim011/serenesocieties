import React from 'react';
import Auth from "../../utils/auth"
import { useQuery } from '@apollo/client';
import {QUERY_ME} from "../../utils/queries"
import { useParams } from 'react-router';


function Profile() {
  const {username} = useParams()
  const {loading, data} = useQuery(QUERY_ME ,{
    variables: {username: username}
  });
  
  const me = data?.me || []
  console.log(me)
  
  if(!Auth.loggedIn()){
  return (
    <p>Login to view your Profile!</p>
  )
}
return(
  <section className='mt-4 '>
  <h1>Welcome Back {me.username}</h1>
  </section>
  
)
}


export default Profile;