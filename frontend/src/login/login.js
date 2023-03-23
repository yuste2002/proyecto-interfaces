import axios from 'axios'

//useState y useEffect son hooks. Estos nos permiten enganchar los componentes con todas las funciones
//que ofrece la libreria react
import {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

const URIuser = 'http://localhost:8000/usuarios/'

const CompLogin = () => {
    const [user, setUser] = useState('')
    const [contrasena, setContrasena] = useState('')

    const inicioSesion = async (e) => {
        
    }

    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h3>Inicio de sesion</h3>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <form onSubmit={inicioSesion}>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre de usuario</label>
                            <input
                                value={user}
                                onChange={ (e) => setUser(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Contraseña</label>
                            <input
                                value={contrasena}
                                onChange={ (e) => setContrasena(e.target.value)}
                                type="password"
                                className='form-control'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>Iniciar Sesion</button>
                    </form>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <h3>¿No tienes cuenta?</h3>
                    <Link to="/registro" className='btn btn-info'>Registrate</Link>
                </div>
            </div>
        </div>
    )
}

export default CompLogin