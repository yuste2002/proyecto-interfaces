import { useParams, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'
import fotoUsuario from '../imagenes/usuario.jpg'
import fotoPropietario from '../imagenes/propietario.jpg'

const URIinvitaciones = "http://localhost:8000/invitaciones/"
const URIusuarios = "http://localhost:8000/usuarios/"
const URIalmacen = "http://localhost:8000/almacenes/"

const CompShowMiembros = () => {
    
    const {idUser} = useParams()
    const {idAlmacen} = useParams()
    const [email,setEmail] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    const [miembros,setMiembros] = useState([])
    useEffect( () => {
        getMiembros()
    },miembros)

    const [propietarioAlmacen, setPropietarioAlmacen] = useState(false) 
    useEffect( () => {
        getPropietarioAlmacen()
    }, false)

    const getPropietarioAlmacen = async () => {
        const res = await axios.get(URIalmacen + idAlmacen)
        let almacen = res.data
        if(almacen.propietario == idUser) {
            setPropietarioAlmacen(true)
        } else {
            setPropietarioAlmacen(false)
        }
        
    }

    const [propietario, setPropietario] = useState('')
    useEffect( () => {
        getPropietario()
    },'')

    const getPropietario = async () => {
        const res = await axios.get(URIalmacen + idAlmacen)
        let almacen = res.data

        const res2 = await axios.get(`${URIusuarios}${almacen.propietario}`)
        let propietario = res2.data

        setPropietario(propietario.nombreUsuario)
    }

    const getMiembros = async () => {
        const res1 = await axios.get(URIinvitaciones)
        const res2 = await axios.get(URIusuarios)

        let invitaciones = res1.data
        let usuarios = res2.data
        
        let member = []
        let user

        let invitacionesFiltrado = invitaciones.filter(invitacion => invitacion.almacen === parseInt(idAlmacen))
        invitacionesFiltrado.forEach(function(invitacion) {
            user = usuarios.find(u => u.id === invitacion.usuario)  
            member.push(user.nombreUsuario)
        })
        setMiembros(member)
    }

    const invitar = async (e) => {
        e.preventDefault()
        const res = await axios.get(URIusuarios)
        let usuarios = res.data
        let usuarioYes = usuarios.find(usuario => usuario.correo === email)

        if (usuarioYes != undefined && (miembros.find(usuario => usuario === usuarioYes.nombreUsuario) == undefined)){
            await axios.post(URIinvitaciones, {
                almacen: parseInt(idAlmacen),
                usuario: usuarioYes.id
            })
            setMiembros([...miembros,usuarioYes.nombreUsuario])
        }else{
            setError('El usuario introducido ya está en el almacen o es inexistente.')
        }


        setEmail("")
    }

    const expulsarMiembro = async (nombreUsuario) => {
        const confirmarExpulsar = window.confirm("¿Estás seguro de que quieres expulsar a "+nombreUsuario+" de este almacén?");
        if (confirmarExpulsar) {
            const res = await axios.get(URIinvitaciones)
            let invitados = res.data
            const res2 = await axios.get(URIusuarios)
            let usuarios = res2.data
            let usuario = usuarios.find(usuario => usuario.nombreUsuario == nombreUsuario)
            let invitacion = invitados.find(invitado => invitado.usuario == usuario.id && invitado.almacen == idAlmacen)
    
            await axios.delete(`${URIinvitaciones}${invitacion.id}`)
        }
        getMiembros()
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-1">
                    <h2>Miembros</h2>
                </div>
                <div className="col-md-11"/>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <div className="card text-center">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={fotoPropietario} style={{width: '80px', height: '80px', objectFit:'contain'}} className="card-img-top img-fluid"></img>
                                </div>
                                <div className="col-md-8">
                                <div className="row mt-3">
                                        <div className="col-md-1"></div>
                                        <div className="col-md-8">
                                        <h3>{propietario} (propietario)</h3>
                                        </div>
                                        <div className="col-md-1">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            { miembros.map ( (miembro) => (
                <div className="col" key={miembro.id}>
                    <div className="card text-center mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={fotoUsuario} style={{width: '80px', height: '80px', objectFit:'contain'}} className="card-img-top img-fluid"></img>
                                </div>
                                <div className="col-md-8">
                                    <div className="row mt-3">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-6">
                                            <h3>{miembro}</h3>
                                        </div>
                                        <div className="col-md-2">
                                            {propietarioAlmacen ? <button className="btn"  style={{backgroundColor:'#EF726B'}} onClick={ () => expulsarMiembro(miembro)}>Expulsar</button> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
            {propietarioAlmacen ? 
            <div className="mb-2 mt-3">
                <form onSubmit={invitar}>
                    <label className='form-label'>Invitar miembro</label>
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-6 mb-3 d-flex justify-content-center align-items-center">
                            <input
                            value={email}
                            onChange={ (e) => setEmail(e.target.value)}
                            type="text"
                            className='form-control'
                            placeholder="usuario@ejemplo.com"
                            style={{ width: '300px'}}
                            />
                        </div>
                        <div className="col-md-2">
                            <button type='submit' className='btn' style={{background:'#54A6F0'}}>Invitar</button>
                        </div>
                    </div>
                    <div className="row">
                            {error && (
                            <div className='row'>
                                <div className='col'>
                                    <div className='alert alert-danger' role='alert'>
                                        {error}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </div> 
            : null}
                
        </div>
    )
    
}

export default CompShowMiembros