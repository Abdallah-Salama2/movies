import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import People from "./pages/People";
import Tv from "./pages/Tv";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { jwtDecode } from "jwt-decode";
import Details from "./pages/Details";
import { ContextMoviesProvider } from "./components/Store";
import axios from "axios";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordReset";

export default function App() {
  const [type, setType] = useState();

  let navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Function to save decoded user data from token
  function saveDataUser() {
    let token = localStorage.getItem("Token");
    if (token) {
      try {
        // let decoded = jwtDecode(token);
        setUserData(token); // Save decoded data in state
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("Token"); // Clear invalid token
      }
    }
  }

  // Check for token on component mount (when page loads)
  useEffect(() => {
    saveDataUser(); // Automatically decode token if present
  }, []);

  // function logout() {
  //   setUserData(null);
  //   localStorage.removeItem("Token");
  //   navigate("/login");
  // }
  function logout() {
    // Get the token from localStorage (if you're using an API token)
    const token = localStorage.getItem("Token");

    console.log(token);
    // Configure the axios request with the Authorization header if using API tokens
    axios
      .post(
        "https://y-sooty-seven.vercel.app/api/api/logout",
        {}, // Send an empty body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the header
          },
        }
      )
      .then(() => {
        setUserData(null); // Clear user data from state
        localStorage.removeItem("Token"); // Clear the token
        navigate("/login"); // Redirect to login page
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  }
  function ProtectedRoutes(props) {
    if (localStorage.getItem("Token") == null) {
      return <Navigate to="/login"></Navigate>;
    } else {
      return props.children;
    }
  }
  return (
    <div>
      <Navbar userData={userData} logout={logout} />
      <div className="container mt-5">
        <Routes>
          <Route
            path=""
            element={
              <ProtectedRoutes>
                <ContextMoviesProvider>
                  <Home />
                </ContextMoviesProvider>
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="home"
            element={
              <ProtectedRoutes>
                <ContextMoviesProvider>
                  <Home />
                </ContextMoviesProvider>
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="movies"
            element={
              <ProtectedRoutes>
                <Movies />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="details/:id"
            element={
              <ProtectedRoutes>
                <Details />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="people"
            element={
              <ProtectedRoutes>
                <People />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="tv"
            element={
              <ProtectedRoutes>
                <Tv />
              </ProtectedRoutes>
            }
          ></Route>
          <Route path="*" element={<h1>Not found</h1>}></Route>
          <Route path="login" element={<Login saveDataUser={saveDataUser} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset/:token" element={<PasswordReset />} />

          <Route
            path="register"
            element={<Register saveDataUser={saveDataUser} />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}
