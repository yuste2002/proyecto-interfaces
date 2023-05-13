  import React from 'react';
  import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
  import '../App.css';
  import logo from '../imagenes/logoNavBar.jpg';
  import fotoUsuario from '../imagenes/usuario.jpg';


  function NavbarPer(props) {
    return (
    <Navbar expand="lg" style={{background: '#bb5751'}}>
      <Navbar.Brand className='ms-3'>
        <img alt="logo aplicacion" src={logo} className='navbar-logo'/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className='navbar-collapse'>
        <Nav className="me-auto">
          <Nav.Link href={`/${props.idUser}/createAlmacen`} className='navbar-link'> + Nuevo Almacen
          </Nav.Link>
          <Nav.Link href={`/${props.idUser}`} className='navbar-link'>Mis almacenes</Nav.Link>
          <Nav.Link href={`/${props.idUser}/compartidos`} className='navbar-link'>
            Compartidos conmigo
          </Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown drop='start' className='me-3' title={<img src={fotoUsuario} style={{ width: '6vh', borderRadius: '20%' }} alt="icono usuario"/>} id="basic-nav-dropdown">
            <NavDropdown.Item href={`/${props.idUser}/editUser`}>Editar perfil</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/">Cerrar sesión</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }

  export default NavbarPer;