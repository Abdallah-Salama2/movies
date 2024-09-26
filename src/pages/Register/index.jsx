import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ saveDataUser }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); //validation for backend
  const [errors, setErrors] = useState(""); //validation for frontend
  const [formData, setFormData] = useState({
    name: "",
    // dateOfBirth: "2024-09-04",
    email: "",
    password: "",
    phone_number: "",
    password_confirmation: "",
  });
  function getData(e) {
    let data = { ...formData };

    data[e.target.name] = e.target.value;
    setFormData(data);
    console.log(data);
    // set data now in formData to send it to api
  }

  function submitHandler(e) {
    e.preventDefault(); // prevent page reload

    let statusError = validateData();
    if (statusError?.error) {
      setErrors(statusError?.error.details);
    } else {
      axios
        .post("https://y-sooty-seven.vercel.app/api/api/register", formData)
        .then((res) => {
          console.log(res);
          localStorage.setItem("Token", res.data.token);

          // Store user data or session (No JWT needed with Sanctum)
          saveDataUser();
          navigate("/home");
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            console.log(err);
            setErrorMessage(err.response.data); // set error message
          } else {
            console.log(err.response.data);

            setErrorMessage("An unexpected error occurred."); // default error message
          }
        });
    }
  }
  //The error "dateOfBirth" is not allowed occurs because the dateOfBirth field is part of your form,
  // but it is not included in the Joi validation schema. To resolve this issue, you need to either add dateOfBirth to the schema or exclude it from the validation.
  function validateData() {
    let schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      password_confirmation: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .messages({
          "any.only": "Passwords do not match",
        }),
      phone_number: Joi.number().required(), // Added dateOfBirth validation
    });

    return schema.validate(formData, { abortEarly: false });
  }
  return (
    <div className="w-75 mx-auto my-5">
      <h1 className="text-center">Register Now</h1>
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
        <label htmlFor="name" className="form-label">
          User Name
        </label>
        <input
          type="text"
          name="name"
          className="form-control mb-3"
          onChange={getData}
        />

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
          Phone Number
        </label>
        <input
          type="number"
          name="phone_number"
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

        <label htmlFor="" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          name="password_confirmation"
          className="form-control mb-3"
          onChange={getData}
        />
        <button type="submit" className="btn btn-outline-info">
          Register
        </button>
      </form>
    </div>
  );
}
