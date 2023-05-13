import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import fotoAlmacen from '../imagenes/almacenDefault.jpg'
import fotoObjeto from '../imagenes/objectDefault.jpg'
import fotoUsuario from '../imagenes/usuario.jpg'
import { Carousel } from 'bootstrap'


const URIuser = 'https://interfaces-vsr.herokuapp.com/usuarios/'

const CompRegistro = () =>{

    const [nombreUs, setNombreUs] = useState('')
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    async function registro (e) {
        e.preventDefault()
        const res = await axios.get(URIuser)
        let users = res.data
        const existeNombre = users.find(usuario => nombreUs == usuario.nombreUsuario)
        const existeCorreo = users.find(usuario => correo == usuario.correo)
        if (existeNombre == undefined && existeCorreo == undefined) {
            await axios.post(URIuser, {
                nombreUsuario:nombreUs, 
                correo:correo, 
                contrasena:password,
                nombre:nombre,
                apellido:apellido
            })
            navigate(`/`)
        } else if (existeNombre == undefined){
            setError('Correo electrónico ya registrado')
        } else {
            setError('Nombre de usuario ya registrado')
        }   
        
    }

    const volverAtras = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    return(
        <html lang="es">
        <div className='d-flex align-items-center vh-100 fondoLogin'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8'>
                        <div className='row'>
                            <div className='col'>
                                <div className='card' style={{padding: '20px', backgroundColor:'rgba(255, 255, 255, 0.7)'}}>
                                    <h1 style={{fontSize: '2.5rem', color: '#333'}}>¿Qué es VSR?</h1>
                                    <div className='d-flex text-start'>
                                        <p style={{fontSize: '1.25rem', color: '#555'}} tabindex="0">VSR es una aplicación diseñada para crear almacenes virtuales compartidos entre familiares, amigos y conocidos, permitiéndoles gestionar inventarios de distintos ámbitos y sus respectivos objetos. Con VSR, los usuarios tienen la capacidad de cambiar objetos, editar su descripción, condiciones de uso y ubicación reciente, y también pueden reservar los objetos por un tiempo determinado. En resumen, VSR es una solución de gestión de inventario en línea altamente personalizable y colaborativa.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-md-4'>
                                <div className='card'>
                                    <img alt='foto almacen' src={fotoAlmacen} style={{width: '100%', height:'100%', objectFit:'contain'}} className="card-img-top img-fluid"></img>
                                    <div className='card-title mt-2'>
                                        <h2>Almacenes</h2>
                                        <span class="hidden">Foto almacen</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='card'>
                                    <img alt='foto objeto' src={fotoObjeto} style={{width: '100%', height:'100%', objectFit:'contain'}} className="card-img-top img-fluid"></img>
                                    <div className='card-title mt-2'>
                                        <h2>Objetos</h2>
                                        <span class="hidden">Foto objeto</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='card'>
                                    <img alt='foto usuario' src={fotoUsuario} style={{width: '100%', height:'100%', objectFit:'contain'}} className="card-img-top img-fluid"></img>
                                    <div className='card-title mt-2'>
                                        <h2>Usuarios</h2>
                                        <span class="hidden">Foto usuario</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card text-bg-light' style={{height:'100%'}}>
                            <div className='card-body'>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col'>
                                            <h1>Registro</h1>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <form onSubmit={registro}>
                                                <div className='mb-3'>
                                                    <label className='form-label' htmlFor="nombreUs">Nombre de usuario*</label>
                                                    <input
                                                        value={nombreUs}
                                                        onChange={ (e) => setNombreUs(e.target.value)}
                                                        type="text"
                                                        className='form-control'
                                                        style={{ width: 'auto', margin: '0 auto' }}
                                                        required='true'
                                                        tabindex="0"
                                                        aria-label="Ingrese su nombre de usuario"
                                                        title="Nombre de usuario"
                                                    />
                                                </div>
                                                <div className='mb-3'>
                                                    <label className='form-label' htmlFor="correo">Correo electrónico*</label>
                                                    <input
                                                        value={correo}
                                                        onChange={ (e) => setCorreo(e.target.value)}
                                                        type="text"
                                                        className='form-control'
                                                        style={{ width: 'auto', margin: '0 auto' }}
                                                        required='true'
                                                        tabindex="0"
                                                        aria-label="Ingrese su correo electronico"
                                                        title="Correo electornico"
                                                    />
                                                </div>
                                                <div className='mb-3'>
                                                    <label className='form-label' htmlFor="password">Contraseña*</label>
                                                    <input
                                                        value={password}
                                                        onChange={ (e) => setPassword(e.target.value)}
                                                        type="password"
                                                        className='form-control'
                                                        style={{ width: 'auto', margin: '0 auto' }}
                                                        required='true'
                                                        tabindex="0"
                                                        aria-label="Ingrese una contraseña"
                                                        title="Contraseña"
                                                    />
                                                </div>
                                                <div className='mb-3'>
                                                    <label className='form-label' htmlFor="nombre">Nombre*</label>
                                                    <input
                                                        value={nombre}
                                                        onChange={ (e) => setNombre(e.target.value)}
                                                        type="text"
                                                        className='form-control'
                                                        style={{ width: 'auto', margin: '0 auto' }}
                                                        required='true'
                                                        tabindex="0"
                                                        aria-label="Ingrese su nombre"
                                                        title="Nombre"
                                                    />
                                                </div>
                                                <div className='mb-5'>
                                                    <label className='form-label' htmlFor="apellido">Apellido</label>
                                                    <input
                                                        value={apellido}
                                                        onChange={ (e) => setApellido(e.target.value)}
                                                        type="text"
                                                        className='form-control'
                                                        style={{ width: 'auto', margin: '0 auto' }}
                                                        tabindex="0"
                                                        aria-label="Ingrese su apellido"
                                                        title="Apellido"
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
                                                <button type='submit' className='btn primario' tabindex="0">Registrarse</button> <br/>
                                                <button onClick={volverAtras} className='btn btn-secondary mt-2' tabindex="0">Volver atrás</button> <br/>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </html>
    )
}

export default CompRegistro