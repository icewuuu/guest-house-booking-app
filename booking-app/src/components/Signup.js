import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import SnackbarMessage from "./SnackbarMessage";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registered, setRegistered] = useState();
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/signup", {
        email: email,
        username: username,
        password: password,
      })
      .then((response) => {
        setRegistered("Registered successfully! Redirecting to login page...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setErrorMessage(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          setErrorMessage("No response from server");
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMessage("An error occurred");
        }
      });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        You already have an account? <Link to="/login">Login</Link>
      </p>
      {registered && (
        <SnackbarMessage
          message="Registered successfully"
          severity="success" // 'error', 'warning', 'info', 'success'
        />
      )}
    </div>
  );
}

export default SignUp;
