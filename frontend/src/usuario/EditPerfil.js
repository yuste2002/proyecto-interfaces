
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

const URIuser = 'https://interfaces-vsr.herokuapp.com/usuarios/'

const CompEditPerfil = () => {
    const {idUser} = useParams()
    const navigate = useNavigate()

    const URIusuarios = "https://interfaces-vsr.herokuapp.com/usuarios/"

    const [error, setError] = useState(null)
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
        const auxUser = usuarioOriginal
    }

    const editar = async (e) => {
        e.preventDefault()
        //¡Hay que comprobar los valores!

        const res = await axios.get(URIuser + idUser)
        const usuarioOriginal = res.data
        console.log(usuarioOriginal.nombreUsuario)
        console.log(usuarioOriginal.correo)

        const isUsernameValid = await noEncontradoPorUsername(username, usuarioOriginal);
        const isEmailValid = await noEncontradoPorEmail(email, usuarioOriginal);

        if (isUsernameValid || isEmailValid){
            await axios.put(URIuser + idUser, {
                nombreUsuario: username,
                correo: email,
                contrasena: password,
                nombre: name,
                apellido: apellid
            })
            navigate(-1)
        }else{
            if (usuarioOriginal.nombreUsuario == username && usuarioOriginal.correo == email)
                navigate(-1)
            else
                setError("El usuario o el correo electrónico están en uso")
        }
 
    }

    const noEncontradoPorUsername = async (username, usuarioOriginal) => {
        const res = await axios.get(URIusuarios)
        const data = res.data
        const usuarios = data.filter(user => user !== usuarioOriginal)

        const usuario = usuarios.find(user => user.nombreUsuario == username)
        return usuario == undefined
    }

    const noEncontradoPorEmail = async (email, usuarioOriginal) => {
        const res = await axios.get(URIusuarios)
        const data = res.data
        const usuarios = data.filter(user => user != usuarioOriginal)
        
        const usuario = usuarios.find(user => user.correo == email)
        return usuario == undefined
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
                        <div className='card' style={{padding: '20%', backgroundColor:'rgba(255, 255, 255, 0.9)'}}>
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
                                                <label className='form-label' tabindex="0" htmlFor="userName">Nombre de usuario*</label>
                                                <input
                                                    id="userName"
                                                    title="Nombre de usuario"
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
                                                <label className='form-label' tabindex="0" htmlFor="email">Correo electronico*</label>
                                                <input
                                                    id="email"
                                                    title="Correo electronico"
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
                                                <label className='form-label' tabindex="0" htmlFor="password">Contraseña*</label>
                                                <input
                                                    id="password"
                                                    title="Contraseña"
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
                                                <label className='form-label' tabindex="0" htmlFor="nombre">Nombre*</label>
                                                <input
                                                    id="nombre"
                                                    title="Nombre de usuario"
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
                                                <label className='form-label' tabindex="0" htmlFor="apellido">Apellido</label>
                                                <input
                                                    id="apellido"
                                                    title="Apellido"
                                                    defaultValue={apellid}
                                                    onChange={ (e) => setApellid(e.target.value)}
                                                    type="text"
                                                    className='form-control'
                                                    style={{ width: 'auto', margin: '0 auto' }}
                                                    aria-label="Ingrese nuevo apellido"
                                                />
                                            </div>
                                            <button type='submit' className='btn primario mt-3'  tabindex="0" title='Confirmar los cambios'>Confirmar Cambios</button> <br/>
                                            <button onClick={volverAtras} className='btn btn-secondary mt-2'  tabindex="0" title='Volver a la página anterior'>Volver atrás</button> 
                                            {error && (
                                                <div className='row'>
                                                    <div className='col'>
                                                        <div className='alert alert-danger' role='alert'>
                                                            {error}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
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