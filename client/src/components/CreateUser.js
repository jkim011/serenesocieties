import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {ADD_USER} from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [addUser, {error, data}] = useMutation(ADD_USER);

    const handleChange = (event) =>{
        const {name, value} = event.target;
    
        setFormState({
            ...formState,
            [name]: value
        });    
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try{
            const{data} = await addUser({
                variables: {...formState}
            });
            Auth.login(data.addUser.token)

        }catch(e){
            console.error(e)
        }
    };

    return (
        <div>
    
        <section className=" mt-4">
        
          <div className="d-flex justify-content-center   vh-100">

                  <form onSubmit={handleFormSubmit} className="login-form w-50">

                    <div className="form-group">
                        <input
                        className="form-control mt-2"
                        placeholder="Create a username"
                        name="username"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                        className="form-control mt-2"
                        placeholder="Enter your email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                        className="form-control mt-2"
                        placeholder="Create Password"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                        />
                    </div>

                    {/* <div className="form-group">
                        <input
                        className="form-control mt-2"
                        placeholder="Reenter Password"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                        />
                    </div> */}



                    <div className=" d-flex justify-content-center ">
                    <button
                      className="btn btn-block btn-primary mt-2 btn-lg"
                      type="submit"
                    >
                      Submit
                    </button>
                    </div>
                  </form>
            
            </div>
                
                
                {/* <Link to={'/login'} className="textDecNone">
                  <h5>Login instead</h5>
                </Link> */}
    
              
             
        
        </section>
    
        </div>
      )





}


export default Signup;