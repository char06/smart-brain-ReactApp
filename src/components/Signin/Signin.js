import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Signin = ({ onRouteChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make API call to Express server for signin
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Successful signin, handle accordingly
        console.log("Successful signin:", result);
        onRouteChange("Home");
      } else {
        // Handle signin error, show error message, etc.
        console.log("Signin error:", result.error);
      }
    } catch (error) {
      console.error("Error during signin:", error);
      // Handle unexpected errors
    }
  };

  const handleRegisterClick = () => {
    onRouteChange("Register");
  };

  return (
    <div className="signin-container">
      <Form className="signin-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <p className="register" onClick={handleRegisterClick}>
            Register here
          </p>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign in
        </Button>
      </Form>
    </div>
  );
};

export default Signin;


