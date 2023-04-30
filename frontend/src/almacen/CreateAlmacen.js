import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css';

const URIalmacen = 'http://localhost:8000/almacenes/'
const URIusuario = 'http://localhost:8000/usuarios/'
const URIinvitacion = 'http://localhost:8000/invitaciones/'

const CompCreateAlmacen = () => {
    const [name, setName] = useState('')
    const [invitados, setInvitados] = useState([])
    const [invitado, setInvitado] = useState('')
    const [correoUsuario, setCorreoUsuario] = useState('')
    const [foto, setFoto] = useState('')
    const [error, setError] = useState(null)

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

    const nuevoInvitado = async (e) => {
        e.preventDefault()
        const res = await axios.get(URIusuario)
        let usuarios = res.data
        let usuarioYes = usuarios.find(usuario => usuario.correo === invitado)

        if (usuarioYes != undefined && correoUsuario !== invitado && (invitados.find(inv => inv === invitado) == undefined)){
            setInvitados([...invitados, invitado])
            setError(null)
        }else if(correoUsuario === invitado){
            setError('No puedes compartir contigo mismo')
        }else if((invitados.find(inv => inv === invitado) != undefined)){
            setError('El usuario ya está en la lista')
        }else if(usuarioYes == undefined){
            setError('El usuario introducido no existe')
        }
        setInvitado('')
    }

    const deleteInvitado = (e, inv) => {
        e.preventDefault()
        const nuevoInvitados = invitados.filter((i) => i !== inv)
        setInvitados(nuevoInvitados)
    }

    const volverAtras = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    return(
        
        <div className='container fondoOut'>
            <div className='row'>
                <div className='col mt-3'>
                    <h1>NUEVO ALMACEN</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <form onSubmit={crearAlmacen}>
                        <div className='mb-3 mt-3'>
                            <label className='form-label'>Nombre*</label>
                            <input
                                value={name}
                                onChange={ (e) => setName(e.target.value)}
                                type="text"
                                className='form-control'
                                style={{ width: 'auto', margin: '0 auto' }}
                                required='true'
                            />
                            <label className='form-label mt-3'>Enlace foto</label> <br/>
                            <input
                                value={foto}
                                onChange={ (e) => setFoto(e.target.value)}
                                type="text"
                                className='form-control'
                                style={{ width: '700px', margin: '0 auto' }}
                            />
                            <div className='mb-3 mt-3'>
                            <label className='form-label'>Compartir con</label> <br/>
                            <input
                                value={invitado}
                                onChange={ (e) => setInvitado(e.target.value)}
                                type="email"
                                className='form-control'
                                placeholder='usuario@ejemplo.com'
                                style={{ width: 'auto', margin: '0 auto' }}
                            />
                            <button onClick={nuevoInvitado} className='btn btn-info mt-3'>Compartir</button>
                            <div className="row">
                            {error && (
                            <div className='row'>
                                <div className='col'>
                                    <div className='alert alert-danger mt-4' role='alert'>
                                        {error}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                            </div>

                            <div className='row'>
                                <div className='col-xl-4'></div>
                                    <div className='col-xl-4'>
                                        <div style={{width:'50 vmin', justifyContent:'center',alignItems:'center'}}>
                                            <ul className="list-group">
                                                {invitados.map((inv) => (
                                                    <li className="list-group-item d-flex justify-content-between align-items-center" key={inv}>
                                                    {inv}
                                                    <button className="btn" style={{backgroundColor:'#EF726B'}} onClick={(e) => deleteInvitado(e, inv)}>
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                <div className='col-xl-4'></div>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary btn-lg'>Crear nuevo almacen</button><br/>
                        <button onClick={volverAtras} className='btn btn-secondary mt-2'>Volver atrás</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompCreateAlmacen