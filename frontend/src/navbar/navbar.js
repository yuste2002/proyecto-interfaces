  import React from 'react';
  import {Link} from "react-router-dom"
  import '../App.css';
  import logo from '../imagenes/logoNavBar.jpg';
  import fotoUsuario from '../imagenes/usuario.jpg'


  function Navbar(props) {
    return (
      <nav className="navbar">
        <div className="navbar__logo">
          <img src={logo}/>
        </div>
        <div className="col-md-1">
            <Link to={`/${props.idUser}/editUser`} className='btn mt-2 mb-2'><img src={fotoUsuario} style={{width:'50px', borderRadius:'20%'}}></img></Link>
        </div>
      </nav>
    );
  }

  export default Navbar;