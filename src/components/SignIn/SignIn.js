import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './SignIn.css'
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const SignIn = ({loadUser, setToken}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const onEmailChange = (event) => {
      let value = event.target.value
      setEmail(value)
    }

    const onPasswordChange = (event) => {
      let value = event.target.value
      setPassword(value)
    }

    const onButtonSubmit = (event) => {
      event.target.disabled = true;
      fetch('https://sparkling-night-490.fly.dev/signin', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({
          email : email,
          password : password,
        })
      })
      
      .then(response => response.json())
      .then(async (data) => { 
        if(data.id) {
          setToken(data.token)
          loadUser(data)
          navigate('/smartbrain')
          toast.success('Successfully logged in')
          
        } else {
          event.target.disabled = false;
          toast.error(data)
        }
      })
    }

      return (
        <div className='signInBox'>
          <Toaster />
          <Form.Group className="mb-5" controlId="formBasicEmail">
            <Form.Label style={{display : 'flex', justifyContent : 'center',fontSize : '40px', fontWeight : '700', color : '#123533'}}>Sign In</Form.Label><br />
            <Form.Label>Email address</Form.Label>
            <Form.Control onInput={onEmailChange} type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onInput={onPasswordChange} type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={onButtonSubmit}>
            Sign In
          </Button>
        </div>
      )
    }
export default SignIn;