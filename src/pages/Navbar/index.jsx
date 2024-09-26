import React from "react";
import NavLinkComponent from "./NavLinkComponent";
import { Link } from "react-router-dom";

let navLinks = [
  { name: "Home", path: "home" },
  { name: "Movies", path: "movies" },
  { name: "People", path: "people" },
  { name: "Tv", path: "tv" },
];

export default function Navbar({ userData, logout }) {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-transparent px-5 navbar-dark"
        style={{ boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 10px" }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand fs-1 text-center " to="#">
            Noxe
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse  " id="navbarNav">
            {userData != null && (
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fs-5 gap-5">
                {navLinks.map(function (link) {
                  return <NavLinkComponent link={link} key={link.path} />;
                })}
              </ul>
            )}
          </div>

          {/* Social icons and login/logout section outside the collapsing area */}
          <div className="d-flex align-items-center ">
            {userData != null && (
              <ul className="navbar-nav align-items-center mb-2 mb-lg-0 text-white">
                <li className="nav-item fs-4">
                  <i className="me-4 fa-brands fa-facebook"></i>
                  <i className="me-4 fa-brands fa-twitter"></i>
                  <i className="me-4 fa-brands fa-instagram"></i>
                </li>
                <li
                  className="nav-item"
                  onClick={logout}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </li>
              </ul>
            )}

            {userData == null && (
              <ul className="navbar-nav align-items-center mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" to="Login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="Register">
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
