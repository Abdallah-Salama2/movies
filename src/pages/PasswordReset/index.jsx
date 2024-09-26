import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function PasswordReset() {
  const { token } = useParams(); // Get the token from the URL
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Extract email from query string
  const query = new URLSearchParams(location.search);
  const email = query.get("email");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that password and confirmation match
    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    // Send password reset request to the backend
    axios
      .post("https://y-sooty-seven.vercel.app/api/api/reset-password", {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then((res) => {
        setMessage("Password reset successfully.");
        setError("");
        navigate("/login"); // Redirect to login page after success
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          console.log(err);
          setError("Invalid token or email.");
        } else {
          setError("An unexpected error occurred.");
        }
        setMessage("");
      });
  };

  return (
    <div className="w-75 mx-auto my-5">
      <h1 className="text-center">Reset Password</h1>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="password" className="form-label">
          New Password
        </label>
        <input
          type="password"
          name="password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password_confirmation" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          name="password_confirmation"
          className="form-control mb-3"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button type="submit" className="btn btn-outline-info">
          Reset Password
        </button>
      </form>
    </div>
  );
}
