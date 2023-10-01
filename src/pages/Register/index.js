import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Register.css"

function Register() {
    const navigate = useNavigate();
    const endpoint = 'http://localhost:3000/Usuarios/';

    const handleSubmit = (event)=>{
        console.log(event.target.username.value);
        event.preventDefault();
        axios
        .post(endpoint, {
            username: event.target.username.value,
            password: event.target.password.value
        })
        .then((response) => {
            alert('Se ha registrado la cuenta');
            navigate('/Login')
        })
        .catch((reject)=>{
            alert('ERROR')
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='container'>
            <h1>Register</h1>
              <div className='form-group'>
                  <label>Username</label>
                  <input type='text' placeholder='username' className='form-control' name='username'/>
              </div>
              <br/>
              <div className='form-group'>
                  <label>Password</label>
                  <input type='password' placeholder='password' className='form-control' name='password'/>
              </div>
              <button type='submit'>SIGN UP</button>
              <button onClick={()=>navigate('/Login')}>GO TO LOGIN</button>
            </form>
        </>
    )
}

export default Register;