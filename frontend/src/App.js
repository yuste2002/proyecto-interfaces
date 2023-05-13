import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from "./login/login"
import Registro from "./registro/registro"
import InicioUsuario from "./almacen/ShowMisAlmacenes"
import CreateAlmacen from "./almacen/CreateAlmacen"
import EditUsuario from "./usuario/EditPerfil"
import EditAlmacen from "./almacen/EditAlmacen"
import Compartidos from "./almacen/ShowCompartidos"
import BloqueIzq from "./bloqueIzquierdo/bloqueIzquierdo"
import PagesMisAlmacenes from "./pages/MisAlmacenesBloque"
import PagesCompartidos from "./pages/CompartidosBloque"
import CompEditObjeto from './objeto/EditObjeto';
import AlmacenBloque from './pages/AlmacenBloque';
import CompCreateObjetos from './objeto/CreateObjeto';
import CompReservaObjeto from './objeto/ReservaObjeto';
import ObjetoBloque from './pages/ObjetoBloque';


/**
 * Este es el archivo principal del frontend. En este archivo definimos las rutas para cada
 * componente que hemos creado. 
 */

function App() {
  return (
    <div className="App fondoOut">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/registro" element={<Registro/>}/>
          <Route path="/:idUser" element={<PagesMisAlmacenes/>}/>
          <Route path="/:idUser/bloque" element={<BloqueIzq/>}/>
          <Route path="/:idUser/compartidos" element={<PagesCompartidos/>}/>
          <Route path="/:idUser/createAlmacen" element={<CreateAlmacen/>}/>
          <Route path="/:idUser/editUser" element={<EditUsuario/>}/>
          <Route path='/:idUser/editAlmacen/:idAlmacen' element={<EditAlmacen/>}/>
          <Route path='/:idUser/:idAlmacen' element={<AlmacenBloque/>}/>
          <Route path='/objeto/:idObjeto/:idUser' element={<ObjetoBloque/>}/> 
          <Route path='/:idAlmacen/:idUser/crearObjeto' element={<CompCreateObjetos/>}/>
          <Route path='/reserva/:idObjeto/:idUser' element={<CompReservaObjeto/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
