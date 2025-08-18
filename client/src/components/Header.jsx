import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo" >Rentit</div>
      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Explore</a>
        <a href="#">Rent Out</a>
      </nav>
      <div className="menu-icon">
        &#9776;
      </div>
    </header>
  );
}

export default Header;
