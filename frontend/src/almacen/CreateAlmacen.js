import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const URIalmacen = 'http://localhost:8000/almacenes/'
const URIusuario = 'http://localhost:8000/usuarios/'
const URIinvitacion = 'http://localhost:8000/invitaciones/'

const CompCreateAlmacen = () => {
    const [name, setName] = useState('')
    const [invitados, setInvitados] = useState([])
    const [invitado, setInvitado] = useState('')
    const [correoUsuario, setCorreoUsuario] = useState('')

    const {idUser} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        crearCorreoUsuario()
    },'')

    const crearCorreoUsuario = async (e) => {
        let res = await axios.get(URIusuario+idUser)
        setCorreoUsuario(res.data.correo)
    }

    const crearAlmacen = async (e) => {
        e.preventDefault()
        const almacen = await axios.get(URIalmacen)
        let almacenesData = almacen.data
        const almacenNotAdded = almacenesData.find(almacen => name === almacen.nombre)
        if (almacenNotAdded === undefined){  //No hay un almacen con este nombre
            axios.post(URIalmacen, {
                nombre: name, 
                propietario: idUser
            })
            invitados.forEach(async inv => {
                const res = await axios.get(URIusuario)
                let users = res.data
                const existe = users.find(usuario => inv === usuario.correo)
                if(existe !== undefined) {
                    axios.post(URIinvitacion, {
                        usuario: existe.id,
                        almacen: (await axios.get(URIalmacen)).data.find(al => al.nombre === name).id
                    })
                }
            })
        }
        navigate(`/${idUser}`)
    }

    const nuevoInvitado = (e) => {
        e.preventDefault()
        if (correoUsuario !== invitado){
            setInvitados([...invitados, invitado])
        }
        setInvitado('')
    }

    const deleteInvitado = (e, inv) => {
        e.preventDefault()
        const nuevoInvitados = invitados.filter((i) => i !== inv)
        setInvitados(nuevoInvitados)
    }

    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1>NUEVO ALMACEN</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <form onSubmit={crearAlmacen}>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre</label>
                            <input
                                value={name}
                                onChange={ (e) => setName(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                            <div className='mb-3'>
                            <label className='form-label'>Compartir con</label> <br/>
                            <input
                                value={invitado}
                                onChange={ (e) => setInvitado(e.target.value)}
                                type="email"
                                className='form-control'
                            />
                            </div>
                            <button onClick={nuevoInvitado} className='btn btn-primary'>Compartir</button>
                            <table border={1}>
                                {invitados.map((inv) => (
                                    <tr>
                                        <td key={inv}>
                                            {inv}
                                            <button onClick={ (e) =>deleteInvitado(e, inv)}><i class="fa-solid fa-trash"></i></button>
                                        </td>
                                        
                                    </tr>
                                ))}
                            </table>
                        </div>
                        <button type='submit' className='btn btn-primary'>Crear</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompCreateAlmacen