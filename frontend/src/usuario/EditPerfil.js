
import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const URIuser = 'http://localhost:8000/usuarios/'

const CompEditPerfil = () => {
    const {idUser} = useParams()
    /*
    const usuarioOriginal = await axios.get(URIuser + idUser)

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

    const editar = async () => {
        const usuarioOriginal = await axios.get(URIuser + idUser)
        console.log(usuarioOriginal.data)

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
                                value={username}
                                onChange={ (e) => setUsername(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Correo electronico</label>
                            <input
                                value={email}
                                onChange={ (e) => setEmail(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Contraseña</label>
                            <input
                                value={password}
                                onChange={ (e) => setPassword(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre</label>
                            <input
                                value={name}
                                onChange={ (e) => setName(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Apellido</label>
                            <input
                                value={apellid}
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