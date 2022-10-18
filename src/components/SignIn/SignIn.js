import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './SignIn.css'
import toast, { Toaster } from "react-hot-toast";

class SignIn extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        signInEmail : '',
        signInPassword : ''
      }
    }

    onEmailChange = (event) => {
      let value = event.target.value
      this.setState({signInEmail : value})
    }

    onPasswordChange = (event) => {
      let value = event.target.value
      this.setState({signInPassword : value})
    }

    onButtonSubmit = (event) => {
      event.target.disabled = true;
      fetch('https://agile-hamlet-40668.herokuapp.com/signin', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({
          email : this.state.signInEmail,
          password : this.state.signInPassword,
        })
      })
      .then(response => response.json())
      .then(data => {
        if(data.id) {
          this.props.loadUser(data)
          this.props.onRouteChange('homescreen')
        } else {
          event.target.disabled = false;
          toast.error(data)
        }
      })
    }

    render() {
      return (
        <div className='signInBox'>
          <Toaster />
          <Form.Group className="mb-5" controlId="formBasicEmail">
            <Form.Label style={{display : 'flex', justifyContent : 'center',fontSize : '40px', fontWeight : '700', color : '#123533'}}>Sign In</Form.Label><br />
            <Form.Label>Email address</Form.Label>
            <Form.Control onInput={this.onEmailChange} type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onInput={this.onPasswordChange} type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.onButtonSubmit}>
            Sign In
          </Button>
        </div>
      )
    }
}
export default SignIn;