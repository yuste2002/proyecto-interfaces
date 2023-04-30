import React from 'react';
import {Link} from "react-router-dom"
import '../App.css';
import logo from '../imagenes/logoNavBar.jpg';


function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={logo}/>
      </div>
      <div className="col-md-1">
          <Link to={`/${props.idUser}/editUser`} className='btn btn-primary mt-2 mb-2'><i class="fa-duotone fa-person"></i></Link>
      </div>
    </nav>
  );
}

export default Navbar;