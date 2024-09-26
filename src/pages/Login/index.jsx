import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ saveDataUser }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); //validation for backend
  const [errors, setErrors] = useState(""); //validation for frontend
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false, // add remember field
  });
  function getData(e) {
    let data = { ...formData };
    if (e.target.name === "remember") {
      data[e.target.name] = e.target.checked; // handle checkbox
    } else {
      data[e.target.name] = e.target.value;
    }
    setFormData(data);
    console.log(data);
    // set data now in formData to send it to api
  }

  // function submitHandler(e) {
  //   e.preventDefault(); // prevent page reload

  //   let statusError = validateData();
  //   if (statusError?.error) {
  //     setErrors(statusError?.error.details);
  //   } else {
  //     axios
  //       .post("http://hawas.runasp.net/api/v1/Login", formData)
  //       .then((res) => {
  //         console.log(res.data.jwt);
  //         localStorage.setItem("Token", res.data.jwt);
  //         saveDataUser();
  //         navigate("/home");
  //       })
  //       .catch((err) => {
  //         if (err.response && err.response.data) {
  //           console.log(err);
  //           setErrorMessage(err.response.data); // set error message
  //         } else {
  //           console.log(err.response.data);

  //           setErrorMessage("An unexpected error occurred."); // default error message
  //         }
  //       });
  //   }
  // }
  //The error "dateOfBirth" is not allowed occurs because the dateOfBirth field is part of your form,
  // but it is not included in the Joi validation schema. To resolve this issue, you need to either add dateOfBirth to the schema or exclude it from the validation.

  async function submitHandler(e) {
    e.preventDefault();

    let statusError = validateData();
    if (statusError?.error) {
      setErrors(statusError?.error.details);
    } else {
      try {
        // Get CSRF token
        await axios.get("https://y-sooty-seven.vercel.app/sanctum/csrf-cookie");

        // Make login request
        const res = await axios.post(
          "https://y-sooty-seven.vercel.app/api/api/login",
          formData
        );
        console.log(res.data.token);
        localStorage.setItem("Token", res.data.token);

        // Store user data or session (No JWT needed with Sanctum)
        saveDataUser();

        navigate("/home");
      } catch (err) {
        if (err.response && err.response.data) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      }
    }
  }

  function validateData() {
    let schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      remember: Joi.required(),
    });

    return schema.validate(formData, { abortEarly: false });
  }

  return (
    <div className="w-75 mx-auto my-5">
      <h1 className="text-center">Login </h1>
      {/* Conditionally show error message if it exists */}
      {errorMessage.length > 0 && (
        <div className="alert alert-danger">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
      {errors?.length > 0 &&
        errors.map((err, i) => (
          <div key={i} className="alert alert-danger">
            <strong>Error:</strong> {err.message}
          </div>
        ))}
      <form onSubmit={submitHandler}>
        <label htmlFor="" className="form-label">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="form-control mb-3"
          onChange={getData}
        />

        <label htmlFor="" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="form-control mb-3"
          onChange={getData}
        />

        <div className="d-flex justify-content-between mt-4">
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="remember"
              name="remember"
              onChange={getData}
            />
            <label className="form-check-label" htmlFor="remember">
              Remember Me
            </label>
          </div>

          <div className="mt-3">
            <Link to="/forgot-password" className="text-decoration-none">
              Forgot Password?
            </Link>
          </div>
        </div>
        <button type="submit" className="btn btn-outline-info">
          Login
        </button>
      </form>
    </div>
  );
}
