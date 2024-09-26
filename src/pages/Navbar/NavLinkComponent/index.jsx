import React from "react";
import { Link } from "react-router-dom";

export default function NavLinkComponent({ link }) {
  return (
    <li className="nav-item">
      <Link className="nav-link active" aria-current="page" to={link.path}>
        {link.name}
      </Link>
    </li>
  );
}
