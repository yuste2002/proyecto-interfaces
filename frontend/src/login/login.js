import axios from 'axios'

//useState y useEffect son hooks. Estos nos permiten enganchar los componentes con todas las funciones
//que ofrece la libreria react
import {useState, useEffect} from 'react'
import { Link, useParams, Redirect, useNavigate} from 'react-router-dom'

const URIuser = 'http://localhost:8000/usuarios/'

const CompLogin = () => {
    const [user, setUser] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [isLoggedIn, setLoggedIn] = useState(false)

    let usuario
    const navigate = useNavigate()
    async function inicioSesion (e) {
        /*console.log(contrasena)
        console.log(user)*/
        
        let usuario = null
        console.log("furula")
        let userExists
        try{
            usuario = await axios.get(URIuser, {nombreUsuario:user, contrasena:contrasena})
            console.log(usuario)
            setLoggedIn(true)
        }catch(error){
            console.log(error)
        }
        if(isLoggedIn) {
            navigate('/inicio')
        }
        
        /*
        axios.get(URIuser)
            .then(response => {
                userExists = response.data.some(u => u.nombreUsuario === user && u.contrasena === contrasena);
                // userExists será true si se encuentra el usuario y false si no se encuentra
            })
            .catch(error => {
                console.log(error);
            });
        
        if(userExists) {
            setLoggedIn(true)
        }*/
        
        
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