import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from "./login/Login"
import Registro from "./registro/Registro"
import InicioUsuario from "./almacen/ShowMisAlmacenes"
import CreateAlmacen from "./almacen/CreateAlmacen"
import EditUsuario from "./usuario/EditPerfil"
import EditAlmacen from "./almacen/EditAlmacen"

/**
 * Este es el archivo principal del frontend. En este archivo definimos las rutas para cada
 * componente que hemos creado. 
 */

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/registro" element={<Registro/>}/>
          <Route path="/:idUser" element={<InicioUsuario/>}/>
          <Route path="/:idUser/createAlmacen" element={<CreateAlmacen/>}/>
          <Route path="/:idUser/editUser" element={<EditUsuario/>}/>
          <Route path='/:idUser/editAlmacen/:idAlmacen' element={<EditAlmacen/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
