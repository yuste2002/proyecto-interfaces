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
            <div className="row row-cols-4">
                { almacenes.map ( (almacen) => (
                    <div className="col" key={almacen.id}>
                        <div className="card text-center mb-4">
                            {almacen.foto == undefined ? 
                            <img src={process.env.PUBLIC_URL + 'proyecto-interfaces\frontend\src\imagenes\almacenDefault.jpg'} style={{width: '250px', height:'250px', objectFit:'contain'}} className="card-img-top img-fluid"></img>:
                            <img src={`${almacen.foto}`} style={{width: '250px', height:'250px', objectFit:'contain'}} className="card-img-top img-fluid"></img>
                            }
                            <div className="card-body">
                                <h2 className="card-title">{almacen.nombre}</h2>
                                <Link to={`/${idUser}/${almacen.id}`} className='btn btn-info'>Acceder</Link> 
                                <button className="ms-2 btn btn-danger" onClick={ ()=>deleteAlmacen(almacen.id)}>Borrar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default CompShowMisAlmacenes