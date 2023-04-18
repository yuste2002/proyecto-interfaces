import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from 'axios'

const URIalmacen = 'http://localhost:8000/almacenes/'
const URIinvitacion = 'http://localhost:8000/invitaciones/'
const URIobjeto = 'http://localhost:8000/objetos/'

const CompShowMisAlmacenes = () => {
    //Pillo el id del usuario desde la url
    const {idUser} = useParams()

    const [almacenes, setAlmacenes] = useState([])
    useEffect( () => {
        getAlmacenes()
    },[])
    
    const getAlmacenes = async () => {
        const res = await axios.get(URIalmacen)
        let almacens = res.data
        let almacenesFiltrados = almacens.filter(almacen => almacen.propietario == idUser)
        setAlmacenes(almacenesFiltrados)
    }

    const deleteAlmacen = async (id) => {
        //Borrado en cascada de los objetosAsociados al almacen 
        const resObj = await axios.get(URIobjeto)
        let objetos = resObj.data
        let objetosAsociados = objetos.filter(objeto => objeto.almacenAsociado === id)
        //Por cada objeto tengo que borrar sus reservas asociadas (luego)
        objetosAsociados.map(async (objeto) => {
            await axios.delete(`${URIobjeto}${objeto.id}`)
        })

        //Borrado en cascada de las invitaciones asociadas al almacen
        const resInv = await axios.get(URIinvitacion)
        let invitaciones = resInv.data
        let invitacionesAsociadas = invitaciones.filter(invitacion => invitacion.almacen === id)
        invitacionesAsociadas.map(async (invitacion) => {
            await axios.delete(`${URIinvitacion}${invitacion.id}`)
        })

        await axios.delete(`${URIalmacen}${id}`)
        getAlmacenes()
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-11">
                    <h1>Mis Almacenes</h1>
                </div>
                <div className="col-md-1">
                    <Link to={`/${idUser}/editUser`} className='btn btn-primary mt-2 mb-2'><i class="fa-solid fa-user-ninja"></i></Link>
                </div>
            </div>
            <div className="row">
                { almacenes.map ( (almacen) => (
                    <div className="col badge rounded-pill bg-primary m-2" key={almacen.id}>
                        <h2>{almacen.nombre}</h2>
                        <Link to={`/${idUser}/${almacen.id}`} className='btn btn-info'>Acceder</Link> 
                        <button className="ms-2" onClick={ ()=>deleteAlmacen(almacen.id)}><i class="fa-sharp fa-solid fa-trash"></i></button>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default CompShowMisAlmacenes