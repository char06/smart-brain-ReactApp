import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Register = ({ onRouteChange, currentUser }) => {
  // State to manage input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State to store the user information after successful registration or update
  const [user, setUser] = useState(null);

  // Effect to update input values when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
      // Password is usually not displayed in the form for security reasons
    }
  }, [currentUser]);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Determine whether to make a registration or update request
      const endpoint = currentUser ? "/update" : "/register";

      // Make a POST request to the appropriate endpoint of the server
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentUser ? currentUser.id : null,
          name,
          email,
          password,
        }),
      });

      // Parse the server response
      const result = await response.json();

      // Check if the request was successful (HTTP status code 200)
      if (response.ok) {
        console.log("Successful request:", result);

        // Update the user state with the registered/updated user information
        setUser(result);

        // Update the route to "Home" or perform other actions
        onRouteChange("Home");
      } else {
        // Handle request error (show error message, etc.)
        console.log("Request error:", result.error);
      }
    } catch (error) {
      // Handle unexpected errors during the request
      console.error("Error during request:", error);
    }
  };

  return (
    <div className="signin-container">
      <Form className="signin-form" onSubmit={handleSubmit}>
        {/* Input for Name */}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        {/* Input for Email */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        {/* Input for Password */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {/* Submit Button */}
        <Button type="submit" variant="primary">
          {currentUser ? "Update" : "Register"}
        </Button>
      </Form>

      {/* Display user information after successful registration or update */}
      {user && (
        <div>
          <p>{currentUser ? "Updated User Information:" : "Registered User Information:"}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* You can display other user information here */}
        </div>
      )}
    </div>
  );
};

export default Register;


