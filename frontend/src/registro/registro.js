import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const URIuser = 'http://localhost:8000/usuarios/'

const CompRegistro = () =>{

    const [nombreUs, setNombreUs] = useState('')
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')

    const navigate = useNavigate()

    async function registro (e) {
        e.preventDefault()

        await axios.post(URIuser, {
            nombreUsuario:nombreUs, 
            correo:correo, 
            contrasena:password,
            nombre:nombre,
            apellido:apellido
        })
        navigate(`/`)
    }

    const volverAtras = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h3>Registro</h3>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <form onSubmit={registro}>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre de usuario</label>
                            <input
                                value={nombreUs}
                                onChange={ (e) => setNombreUs(e.target.value)}
                                type="text"
                                className='form-control'
                                style={{ width: 'auto', margin: '0 auto' }}
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Correo electronico</label>
                            <input
                                value={correo}
                                onChange={ (e) => setCorreo(e.target.value)}
                                type="text"
                                className='form-control'
                                style={{ width: 'auto', margin: '0 auto' }}
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Contraseña</label>
                            <input
                                value={password}
                                onChange={ (e) => setPassword(e.target.value)}
                                type="password"
                                className='form-control'
                                style={{ width: 'auto', margin: '0 auto' }}
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre</label>
                            <input
                                value={nombre}
                                onChange={ (e) => setNombre(e.target.value)}
                                type="text"
                                className='form-control'
                                style={{ width: 'auto', margin: '0 auto' }}
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Apellido</label>
                            <input
                                value={apellido}
                                onChange={ (e) => setApellido(e.target.value)}
                                type="text"
                                className='form-control'
                                style={{ width: 'auto', margin: '0 auto' }}
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>Registrarse</button> <br/>
                        <button onClick={volverAtras} className='btn btn-secondary mt-2'>Volver atrás</button> <br/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompRegistro