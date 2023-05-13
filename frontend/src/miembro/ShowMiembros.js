import { useParams, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'
import fotoUsuario from '../imagenes/usuario.jpg'
import fotoPropietario from '../imagenes/propietario.jpg'

const URIinvitaciones = "https://interfaces-vsr.herokuapp.com/invitaciones/"
const URIusuarios = "https://interfaces-vsr.herokuapp.com/usuarios/"
const URIalmacen = "https://interfaces-vsr.herokuapp.com/almacenes/"

const CompShowMiembros = () => {
    
    const {idUser} = useParams()
    const {idAlmacen} = useParams()
    const [email,setEmail] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    const [miembros,setMiembros] = useState([])
    useEffect( () => {
            getMiembros()
    },[])

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

    const [propietarioAlmacen, setPropietarioAlmacen] = useState(false) 
    useEffect( () => {
        getPropietarioAlmacen()
    }, [])

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

    const invitar = async (e) => {
        e.preventDefault()
        const res = await axios.get(URIusuarios)
        let usuarios = res.data
        let usuarioYes = usuarios.find(usuario => usuario.correo === email)

        if (usuarioYes != undefined && (miembros.find(usuario => usuario === usuarioYes.nombreUsuario) == undefined) && idUser != usuarioYes.id){
            await axios.post(URIinvitaciones, {
                almacen: parseInt(idAlmacen),
                usuario: usuarioYes.id
            })
            setMiembros([...miembros,usuarioYes.nombreUsuario])
            setError(null)
        }else if (usuarioYes == undefined){
            setError('El usuario introducido no existe')
        }
        else if (idUser == usuarioYes.id){
            setError('No puedes compartir contigo mismo')
        }else if (miembros.find(usuario => usuario === usuarioYes.nombreUsuario) != undefined){
            setError('El usuario ya está invitado')
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
                    <h1 tabindex="0">Miembros</h1>
                </div>
                <div className="col-md-11"/>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <div className="card text-center">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <img src={fotoPropietario}  alt='Imagen de propietario' style={{width: '80px', height: '80px', objectFit:'contain'}} className="card-img-top img-fluid"></img>
                                </div>
                                <div className="col-md-8">
                                <div className="row">
                                        <div className="col-md-1"></div>
                                        <div className="col-md-8">
                                        <h3 tabindex="0">{propietario} (propietario)</h3>
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
                    <div className="card text-center mb-2">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <img src={fotoUsuario} alt='Imagen de propietario' style={{width: '80px', height: '80px', objectFit:'contain'}} className="card-img-top img-fluid"></img>
                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-6">
                                            <h3 tabindex="0">{miembro}</h3>
                                        </div>
                                        <div className="col-md-2">
                                            {propietarioAlmacen ? <button className="btn rojo" tabindex="0" onClick={ () => expulsarMiembro(miembro)}>Expulsar</button> : null}
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
                    <label htmlFor="email" className='form-label' tabindex="0">Invitar miembro</label>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-5 mb-3 d-flex justify-content-center align-items-center">
                            <input
                            id="email"
                            value={email}
                            onChange={ (e) => setEmail(e.target.value)}
                            aria-label="Ingrese el correo electronico para invitar"
                            type="text"
                            className='form-control'
                            placeholder="usuario@ejemplo.com"
                            title="Ingresar el correo electronico del usuario que desea invitar al almacen"
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