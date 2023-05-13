import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css';
import * as bootstrap from 'bootstrap';

const URIalmacen = 'https://interfaces-vsr.herokuapp.com/almacenes/'
const URIusuario = 'https://interfaces-vsr.herokuapp.com/usuarios/'
const URIinvitacion = 'https://interfaces-vsr.herokuapp.com/invitaciones/'

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
        const res = await axios.get(URIalmacen)
        let almacenesData = res.data
        const alamacenExiste = almacenesData.find(almacen => name == almacen.nombre && almacen.propietario == idUser)   
        if (alamacenExiste == undefined){  //No hay un almacen con este nombre
            axios.post(URIalmacen, {
                nombre: name, 
                propietario: idUser,
                foto: foto
            })  
            invitados.forEach(async inv => {
                const res = await axios.get(URIusuario)
                let users = res.data
                const existe = users.find(usuario => inv == usuario.correo)
                if(existe !== undefined) {
                    axios.post(URIinvitacion, {
                        usuario: existe.id,
                        almacen: (await axios.get(URIalmacen)).data.find(al => al.nombre === name).id
                    })
                }
            })
            navigate(`/${idUser}`)
        } else {
            setError('Ya existe un almacen con este nombre.')
        }
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

    const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

    return(
        <div className='d-flex align-items-center vh-100 fondoLogin container-fluid'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                        <div className='card' style={{padding: '20px', backgroundColor:'rgba(255, 255, 255, 0.8)'}}>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <div className='col mt-3'>
                                        <h1 tabindex="0">NUEVO ALMACEN</h1>

                                        <button type="button" class="btn btn-light btn-outline-secondary" id="liveToastBtn"  tabindex="0">INFO</button>
                                            <div class="toast-container position-fixed bottom-0 start-0 p-3">
                                                <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                                    <div class="toast-header">
                                                        <strong class="me-auto">VSR</strong>
                                                        <small>Creación de Almacen</small>
                                                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                                        </div>
                                                        <div class="toast-body">
                                                        Creará un almacen dandole un nombre y una url de imagen que aparecerá posteriormente en 
                                                        sus almacenes. Podrá compartirlo con correos electrónicos de sus amigos y les aparecerá
                                                        en sus almacenes compartidos.
                                                    </div>
                                                </div>
                                            </div>
                                            
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <form onSubmit={crearAlmacen}>
                                            <div className='mb-3 mt-3'>
                                                <label className='form-label' for="nombre">Nombre*</label>
                                                <input
                                                    name="nombre"
                                                    value={name}
                                                    onChange={ (e) => setName(e.target.value)}
                                                    type="text"
                                                    className='form-control'
                                                    style={{ width: '40%', margin: '0 auto' }}
                                                    required='true'
                                                    aria-label="Ingrese el nombre del almacen"
                                                    title="Nombre de almacen"
                                                />
                                                <label className='form-label mt-3' for="foto">Enlace foto</label> <br/>
                                                <input
                                                    name="foto"
                                                    value={foto}
                                                    onChange={ (e) => setFoto(e.target.value)}
                                                    type="text"
                                                    className='form-control'
                                                    style={{ width: '60%', margin: '0 auto' }}
                                                    aria-label="Ingrese un link de imagen para el almacen"
                                                    title="Foto del almacen"
                                                />
                                                <div className='mb-3 mt-3'>
                                                    <label className='form-label' for="invitado">Compartir con</label> <br/>
                                                    <div className='row'>
                                                        <div className='col-md-3'></div>
                                                        <div className='col-md-5 d-flex justify-content-center align-items-center'>
                                                            <input
                                                            name="invitado"
                                                            value={invitado}
                                                            onChange={ (e) => setInvitado(e.target.value)}
                                                            type="email"
                                                            className='form-control'
                                                            placeholder='usuario@ejemplo.com'
                                                            style={{ width: '100%'}}
                                                            aria-label="Ingrese el correo de la persona con quien compartir"
                                                            title="Invitado del almacen"
                                                            />
                                                        </div>
                                                        <div className='col-md-1 align-items-start'>
                                                            <button onClick={nuevoInvitado} className='btn btn-info' tabindex="0">Compartir</button>
                                                        </div>
                                                        <div className='col-md-3'></div>
                                                    </div>
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
                                                {invitados.length > 0 && (
                                                <div className='row'>
                                                    <div className='col-xl-4'></div>
                                                    <div className='col-xl-4'>
                                                    <div style={{ width: '50 vmin', justifyContent: 'center', alignItems: 'center' }}>
                                                        <ul className="list-group">
                                                        {invitados.map((inv) => (
                                                            <li className="list-group-item d-flex justify-content-between align-items-center" key={inv} tabIndex="0">
                                                            {inv}
                                                            <button className="btn rojo" onClick={(e) => deleteInvitado(e, inv)}>
                                                                <i className="fa-solid fa-trash" aria-label="Borrar persona compartida"></i>
                                                            </button>
                                                            </li>
                                                        ))}
                                                        </ul>
                                                    </div>
                                                    </div>
                                                    <div className='col-xl-4'></div>
                                                </div>
                                                )}
                                            </div>
                                            <button type='submit' className='btn btn-lg primario' tabindex="0">Crear nuevo almacen</button><br/>
                                            <button onClick={volverAtras} className='btn btn-secondary mt-2' tabindex="0">Volver atrás</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-2'></div>
                </div>
            </div>
        </div>
        
    )
}

export default CompCreateAlmacen