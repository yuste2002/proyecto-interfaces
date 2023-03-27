import axios from 'axios'

//useState y useEffect son hooks. Estos nos permiten enganchar los componentes con todas las funciones
//que ofrece la libreria react
import {useState, useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom'

const URIuser = 'http://localhost:8000/usuarios/'


const CompLogin = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

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
                window.location.reload(false)
            }
        })
        
        //INICIO SESION PAPRO
        /*
        const usuario = await axios.get(`${URIuser}/nombreUsuario/${user}/contrasena/${password}`)
        console.log(usuario.data)
        navigate(`/${usuario.data.id}`)
        */
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
                                value={password}
                                onChange={ (e) => setPassword(e.target.value)}
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