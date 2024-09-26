import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://y-sooty-seven.vercel.app/api/api/forgot-password", {
        email,
      })
      .then((res) => {
        setMessage("Password reset link sent to your email.");
        setError("");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setError("Email not found or invalid.");
        } else {
          setError("An unexpected error occurred.");
        }
        setMessage("");
      });
  };

  return (
    <div className="w-75 mx-auto my-5">
      <h1 className="text-center">Forgot Password</h1>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn btn-outline-info">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
