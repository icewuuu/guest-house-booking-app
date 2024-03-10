import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import axios from "axios";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/signup", {
        email: email,
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        // Handle response here
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setErrorMessage(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setErrorMessage("No response from server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          setErrorMessage("An error occurred");
        }
      });
    // Handle SignUp logic here
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
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        You already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default SignUp;
