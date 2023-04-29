import React from 'react';
import '../App.css';
import logo from '../imagenes/almacenDefault.jpg';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={logo}/>
      </div>
    </nav>
  );
}

export default Navbar;