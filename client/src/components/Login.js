import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);
  
    // update state based on form input changes
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    // submit form
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      
      try {
        const { data } = await login({
          variables: { ...formState },
        });
  
        Auth.login(data.login.token);
      } catch (e) {
        console.error(e);
      }
  
      // clear form values
      setFormState({
        email: '',
        password: '',
      });
    };
  
    return (
      
        <section className='mt-4 border vh-100'>
            <div  className="d-flex justify-content-center" >
                <form onSubmit={handleFormSubmit} className="login-form mt-4 w-50" >
                    <div className='form-group '>
                    <input
                    className='form-control mt-2'
                    name='email'
                    type='email'
                    placeholder='Email'
                    value={formState.email}
                    onChange={handleChange}>
                    </input>

                    <input
                    className='form-control mt-2'
                    name='password'
                    type='password'
                    placeholder='******'
                    value={formState.password}
                    onChange={handleChange}>
                    </input>

                    </div>

                    <div className=" d-flex justify-content-center mt-2">
                        <button 
                        className="btn btn-block btn-primary mt-2 btn-lg"
                        type="submit">
                            Login
                        </button>
                        
                    </div>
                    <div className=" d-flex justify-content-center mt-2 ">
                    
                    </div>
                    <Link to={"/signup"}>New User? Sign Up Here</Link>
                </form>
            </div>

        </section>
      
    );
  };
  
  export default Login;
  
