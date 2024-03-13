import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import SnackbarMessage from "./SnackbarMessage";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/login", {
        identifier: identifier,
        password: password,
      })
      .then((response) => {
        setLogin("Login successful! Redirecting to home page...");
        setTimeout(() => {
          navigate("/");
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
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username/Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
      {login && (
        <SnackbarMessage
          message="Login successful! Redirecting to home page..."
          severity="success" // 'error', 'warning', 'info', 'success'
        />
      )}
    </div>
  );
}

export default Login;
