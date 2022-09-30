import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Register.css'
import { Formik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const validationSchema = Yup.object().shape({
    name : Yup.string()
        .required('Name is required')
        .max(45, 'Too much!'),
    email : Yup.string()
        .required('Email is required')
        .email('Please enter a valid email'),
    password : Yup.string()
        .required('Password is required')
        .min(6, 'Too short, should be 6 chars minimum')
})

const Register = ({ loadUser, onRouteChange }) => {
    const handleSubmit = (values) => {
        try {
            fetch('https://agile-hamlet-40668.herokuapp.com/register', {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    name : values.name,
                    email : values.email,
                    password : values.password
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.id) {
                    loadUser(data)
                    onRouteChange('homescreen')
                } else {
                    toast.error(data)
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    };  

        return (
            <div>
                <Toaster />
                <Formik 
                 initialValues={{name : "", email : "", password : ""}}
                 onSubmit={(values) => {
                    handleSubmit(values)
                 }}
                 validationSchema={validationSchema}
            >
                {({
                    values,
                    errors,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    touched
                }) => {
                    return (
                        <form className="registerBox" onSubmit={handleSubmit}>
                            <Form.Label style={{display : 'flex', justifyContent : 'center',fontSize : '40px', fontWeight : '700'}}>Register</Form.Label><br />
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type="name" 
                                    placeholder="Your name" 
                                    value={values.name} 
                                    onChange={handleChange("name")} 
                                    onBlur={handleBlur("name")}
                                />
                                <div className="inputErrors">{touched.name && errors.name}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter email" 
                                    value={values.email} 
                                    onChange={handleChange("email")} 
                                    onBlur={handleBlur("email")}
                                />
                                <div className="inputErrors">{touched.email && errors.email}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    value={values.password} 
                                    onChange={handleChange("password")} 
                                    onBlur={handleBlur("password")} 
                                />
                                <div className="inputErrors">{touched.password && errors.password}</div>
                            </Form.Group>
                            <Button variant="primary" type="submit" >
                                Submit
                            </Button>
                        </form>
                    )
                }}
                </Formik>
                
            </div>
            
            
        )
    }

export default Register;