import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from "./login/login"
import Registro from "./registro/registro"
import InicioUsuario from "./usuario/ShowUsuario"

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
          <Route path="/inicio" element={<InicioUsuario/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
