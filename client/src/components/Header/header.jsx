import React from "react";
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
        <button className="btn btn-login">login</button>
      </div>
    </div>
  );
}
