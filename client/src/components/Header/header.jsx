import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../assets/logo.png";
export default function Header() {
  return (
    <div className="header">
      <div className="left-h">
        <img src={logo} alt="" className="logo" />
      </div>
      <div className="center-h">
        <span>Home</span>
        <span>About</span>
        <span>Gallery</span>
        <span>Contact US</span>
      </div>
      <div className="right-h">
        <button className="btn btn-login">
          <Link to="/login" key="1">
            Login
          </Link>
        </button>
      </div>
    </div>
  );
}
