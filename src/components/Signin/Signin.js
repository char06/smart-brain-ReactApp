import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Signin = ({onRouteChange}) => {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    onRouteChange(); // Call the onRouteChange function
      };
  return (
    <div className="signin-container">
      <Form className="signin-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign in
        </Button>
      </Form>
    </div>
  );
};

export default Signin;
