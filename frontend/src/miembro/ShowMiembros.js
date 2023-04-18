import { useParams, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'

const URIinvitaciones = "http://localhost:8000/invitaciones/"
const URIusuarios = "http://localhost:8000/usuarios/"
const URIalmacen = "http://localhost:8000/almacenes/"

const CompShowMiembros = () => {
    
    const {idUser} = useParams()
    const {idAlmacen} = useParams()
    const [email,setEmail] = useState('')
    const navigate = useNavigate()

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


        await axios.post(URIinvitaciones, {
            almacen: parseInt(idAlmacen),
            usuario: usuarioYes.id
        })
        setMiembros([...miembros,usuarioYes.nombreUsuario])
        setEmail("")
    }

    const expulsarMiembro = async (nombreUsuario) => {
        const res = await axios.get(URIinvitaciones)
        let invitados = res.data
        const res2 = await axios.get(URIusuarios)
        let usuarios = res2.data
        let usuario = usuarios.find(usuario => usuario.nombreUsuario == nombreUsuario)
        let invitacion = invitados.find(invitado => invitado.usuario == usuario.id && invitado.almacen == idAlmacen)
        console.log(invitados)
        console.log(invitacion)
        console.log(invitacion.id)
        await axios.delete(`${URIinvitaciones}${invitacion.id}`)
        getMiembros()
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-1">
                    <h2>Miembros</h2>
                </div>
                <div className="col-md-10"/>
                <div className="col-md-1">
                    <h4>Buscador</h4>
                </div>
            </div>
            { miembros.map ( (miembro) => (
                    <div className="row mb-2">
                        <div className="col badge rounded-pill bg-primary">
                            <h3>{miembro}</h3>
                            {propietarioAlmacen ? <button onClick={ () => expulsarMiembro(miembro)}>Expulsar</button> : null}
                        </div>
                    </div>
            ))
            }
            {propietarioAlmacen ? 
            <div className="mb-2">
                <form onSubmit={invitar}>
                    <label className='form-label'>Nombre</label>
                    <input
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                    type="text"
                    className='form-control'/>
                    <button type='submit' className='btn btn-primary'>Invitar</button>
                </form>
            </div> 
            : null}
                
        </div>
    )
    
}

export default CompShowMiembros