
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

const URIuser = 'https://interfaces-vsr.herokuapp.com/usuarios/'

const CompEditPerfil = () => {
    const {idUser} = useParams()
    const navigate = useNavigate()

    /*
    const [username, setUsername] = useState(usuarioOriginal.data.nombreUsuario)
    const [email, setEmail] = useState(usuarioOriginal.data.correo)
    const [password, setPassword] = useState(usuarioOriginal.data.contrasena)
    const [name, setName] = useState(usuarioOriginal.data.nombre)
    const [apellid, setApellid] = useState(usuarioOriginal.data.apellido)
    */

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [apellid, setApellid] = useState('')
    useEffect(() => {
        valoresIniciales()
    }, [])

    const valoresIniciales = async () => {
        const usuarioOriginal = await axios.get(URIuser + idUser)
        setUsername(usuarioOriginal.data.nombreUsuario)
        setEmail(usuarioOriginal.data.correo)
        setPassword(usuarioOriginal.data.contrasena)
        setName(usuarioOriginal.data.nombre)
        setApellid(usuarioOriginal.data.apellido)
    }

    const editar = async (e) => {
        e.preventDefault()

        await axios.put(URIuser + idUser, {
            nombreUsuario: username,
            correo: email,
            contrasena: password,
            nombre: name,
            apellido: apellid
        })

        navigate(-1)
    }

    const volverAtras = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    return(
        <div className='d-flex align-items-center vh-100 fondoLogin'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4'>
                        <div className='card' style={{padding: '20px', backgroundColor:'rgba(255, 255, 255, 0.9)'}}>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <div className='col'>
                                        <h1 tabindex="0">Editar Perfil</h1>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <form onSubmit={editar}>
                                            <div className='mb-3'>
                                                <label className='form-label' tabindex="0">Nombre de usuario*</label>
                                                <input
                                                    defaultValue={username}
                                                    onChange={ (e) => setUsername(e.target.value)}
                                                    type="text"
                                                    className='form-control'
                                                    style={{ width: 'auto', margin: '0 auto' }}
                                                    required='true'
                                                    aria-label="Ingrese nuevo nombre de usuario"
                                                />
                                            </div>
                                            <div className='mb-3'>
                                                <label className='form-label' tabindex="0">Correo electronico*</label>
                                                <input
                                                    defaultValue={email}
                                                    onChange={ (e) => setEmail(e.target.value)}
                                                    type="text"
                                                    className='form-control'
                                                    style={{ width: 'auto', margin: '0 auto' }}
                                                    required='true'
                                                    aria-label="Ingrese nuevo correo electrónico"
                                                />
                                            </div>
                                            <div className='mb-3'>
                                                <label className='form-label' tabindex="0">Contraseña*</label>
                                                <input
                                                    defaultValue={password}
                                                    onChange={ (e) => setPassword(e.target.value)}
                                                    type="password"
                                                    className='form-control'
                                                    style={{ width: 'auto', margin: '0 auto' }}
                                                    required='true'
                                                    aria-label="Ingrese nueva contraseña"
                                                />
                                            </div>
                                            <div className='mb-3'>
                                                <label className='form-label' tabindex="0">Nombre*</label>
                                                <input
                                                    defaultValue={name}
                                                    onChange={ (e) => setName(e.target.value)}
                                                    type="text"
                                                    className='form-control'
                                                    style={{ width: 'auto', margin: '0 auto' }}
                                                    required='true'
                                                    aria-label="Ingrese nuevo nombre"
                                                />
                                            </div>
                                            <div className='mb-3'>
                                                <label className='form-label' tabindex="0">Apellido</label>
                                                <input
                                                    defaultValue={apellid}
                                                    onChange={ (e) => setApellid(e.target.value)}
                                                    type="text"
                                                    className='form-control'
                                                    style={{ width: 'auto', margin: '0 auto' }}
                                                    aria-label="Ingrese nuevo apellido"
                                                />
                                            </div>
                                            <button type='submit' className='btn primario mt-3'  tabindex="0">Confirmar Cambios</button> <br/>
                                            <button onClick={volverAtras} className='btn btn-secondary mt-2'  tabindex="0">Volver atrás</button> 
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'></div>
                </div>
            </div>
        </div>
        
    )


}

export default CompEditPerfil