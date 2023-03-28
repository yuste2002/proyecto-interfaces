
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const URIuser = 'http://localhost:8000/usuarios/'

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

    const editar = async () => {
        
        await axios.put(URIuser + idUser, {
            nombreUsuario: username,
            correo: email,
            contrasena: password,
            nombre: name,
            apellido: apellid
        })

        navigate(`/${idUser}`)
    }

    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h3>Editar Perfil</h3>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <form onSubmit={editar}>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre de usuario</label>
                            <input
                                defaultValue={username}
                                onChange={ (e) => setUsername(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Correo electronico</label>
                            <input
                                defaultValue={email}
                                onChange={ (e) => setEmail(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Contraseña</label>
                            <input
                                defaultValue={password}
                                onChange={ (e) => setPassword(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre</label>
                            <input
                                defaultValue={name}
                                onChange={ (e) => setName(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Apellido</label>
                            <input
                                defaultValue={apellid}
                                onChange={ (e) => setApellid(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>Confirmar Cambios</button>
                    </form>
                </div>
            </div>
        </div>
    )


}

export default CompEditPerfil