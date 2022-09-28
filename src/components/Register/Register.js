import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Register.css'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name : '',
            email : '',
            password : ''
        }
    }

    onNameChange = (event) => {
        let value = event.target.value
        this.setState({name : value})
    }

    onEmailChange = (event) => {
        let value = event.target.value;
        this.setState({email : value})
    }
  
    onPasswordChange = (event) => {
        let value = event.target.value;
        this.setState({password : value})
    }
  
    onButtonSubmit = () => {
        try {
            fetch('https://agile-hamlet-40668.herokuapp.com/register', {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    name : this.state.name,
                    email : this.state.email,
                    password : this.state.password
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.id) {
                    this.props.loadUser(data)
                    this.props.onRouteChange('homescreen')
                } else {
                    console.log(data)
                }
            })
        }
        catch (err) {
            err.json()
            console.log(err)
        }
    }

    render() {
        return (
            <div className="registerBox">
                <Form.Label style={{display : 'flex', justifyContent : 'center',fontSize : '40px', fontWeight : '700'}}>Register</Form.Label><br />
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onInput={this.onNameChange} type="name" placeholder="Your name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onInput={this.onEmailChange} type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onInput={this.onPasswordChange} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.onButtonSubmit}>
                    Submit
                </Button>
            </div>
        )
    }
}

export default Register;