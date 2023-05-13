import axios from 'axios'

//useState y useEffect son hooks. Estos nos permiten enganchar los componentes con todas las funciones
//que ofrece la libreria react
import {useState, useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import fotoPortada from '../imagenes/logoEpico.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'


const URIuser = 'https://interfaces-vsr.herokuapp.com/usuarios/'


const CompLogin = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    async function inicioSesion (e) {
        e.preventDefault()

        //INICIO SESION YUSTE
        /**
         * Almaceno en usuarios todos los usuarios de la bd y uso la funcion find para buscar en el array
         * de usuarios el que cumple con los requisitos. 
         * - Si no se encuentra no se inicia sesion se ejecuta window.location.reload(false) que refresca 
         * la pagina. Asi dejo el form limpio.
         * - Si se inicia sesion, hago un navigate a la vista de dicho usuario para mostrar sus cosas
         */
        axios.get(URIuser)
        .then(response => {
            const usuarios = response.data

            const usuarioEncontrado = usuarios.find(usuario => usuario.nombreUsuario === user && usuario.contrasena === password);
            if(usuarioEncontrado != undefined) {
                navigate(`/${usuarioEncontrado.id}`)
            } else {
                setError('Usuario o contraseña incorrecta.')
            }
        })
        
    }

    return(
        <div className='d-flex align-items-center vh-100 fondoLogin'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-8'>
                        <img  tabindex="0" src={fotoPortada} alt='Imagen de portada' style={{width: '600px', height:'600px', objectFit:'contain'}} longdesc="almacen.html" className="card-img-top img-fluid"></img>
                    </div>
                    <div className='col-lg-4'>
                        <div className='card mb-3' style={{backgroundColor:'rgba(255, 255, 255, 0.7)', marginTop:'30%'}}>
                            <div className='container mt-2 mb-2'>
                                <div className='row'>
                                    <div className='col' >
                                        <h1 tabindex="0">Inicio de sesion</h1>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <form onSubmit={inicioSesion}>
                                            <div className='mb-3'>
                                                <label className='form-label' htmlFor="user">Nombre de usuario</label>
                                                <input
                                                    value={user}
                                                    onChange={ (e) => setUser(e.target.value)}
                                                    type="text"
                                                    className='form-control'
                                                    style={{ width: 'auto', margin: '0 auto' }}
                                                    required='true'
                                                    aria-label="Ingrese su nombre de usuario"
                                                    title="Nombre de usuario"
                                        
                                                />
                                            </div>
                                            <div className='mb-3'>
                                                <label className='form-label' htmlFor="password">Contraseña</label>
                                                <input
                                                    value={password}
                                                    onChange={ (e) => setPassword(e.target.value)}
                                                    type="password"
                                                    className='form-control'
                                                    style={{ width: 'auto', margin: '0 auto' }}
                                                    required='true'
                                                    aria-label="Ingrese su contraseña"
                                                    title="Contraseña"
                                                />
                                            </div>
                                            {error && (
                                                <div className='row'>
                                                    <div className='col'>
                                                        <div className='alert alert-danger' role='alert'>
                                                            {error}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <button type='submit' className='btn primario' tabindex="0" htmlFor="Iniciar">Iniciar Sesion</button>
                                        </form>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col mt-3'>
                                        <h2 tabindex="0">¿No tienes cuenta?</h2>
                                        <Link to="/registro" className='btn rojo' tabindex="0" htmlFor="Registrar">Registrate</Link>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompLogin