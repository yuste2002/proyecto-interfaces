  import React from 'react';
  import {Link} from "react-router-dom"
  import '../App.css';
  import logo from '../imagenes/logoNavBar.jpg';
  import fotoUsuario from '../imagenes/usuario.jpg'


  function Navbar(props) {
    return (
      <nav className="navbar">
        <div className='row align-items-center'>
          <div className='col ms-3'>
            <img src={logo} style={{ width: '50px', borderRadius: '20%' }} alt="logo" />
          </div>
          <div className='col'>
            <Link to={`/${props.idUser}/createAlmacen`} className='btn' style={{ backgroundColor: '#fff4e3', color: 'black', width: '200px' }}>
              <i className="fa-duotone fa-plus"></i> Nuevo Almacen
            </Link>
          </div>
          <div className='col'>
            <Link to={`/${props.idUser}`} className='btn' style={{ backgroundColor: '#fff4e3', color: 'black', width: '200px' }}>Mis almacenes</Link>
          </div>
          <div className='col'>
            <Link to={`/${props.idUser}/compartidos`} className='btn' style={{ backgroundColor: '#fff4e3', color: 'black', width: '200px' }}>Compartidos conmigo</Link>
          </div>
        </div>
        <div className="navbar-nav me-2">
          <div className="nav-item">
            <Link to={`/${props.idUser}/editUser`} className='btn'>
              <img src={fotoUsuario} style={{ width: '50px', borderRadius: '20%' }} alt="foto usuario" />
            </Link>
          </div>
        </div>
    </nav>
    );
  }

  export default Navbar;