import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from 'axios'
import almacenDefault from '../imagenes/almacenDefault.jpg'


const URIalmacen = 'http://localhost:8000/almacenes/'
const URIinvitacion = 'http://localhost:8000/invitaciones/'
const URIobjeto = 'http://localhost:8000/objetos/'
const URIreserva = 'http://localhost:8000/reservas/'

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
        const confirmarBorrado = window.confirm("¿Estás seguro de que quieres borrar este almacén?");
        if (confirmarBorrado) {
            //Borrado en cascada de los objetosAsociados al almacen 
            const resObj = await axios.get(URIobjeto)
            let objetos = resObj.data
            let objetosAsociados = objetos.filter(objeto => objeto.almacenAsociado === id)
            //Por cada objeto tengo que borrar sus reservas asociadas
            objetosAsociados.map(async (objeto) => {
                const resRes = await axios.get(URIreserva)
                let reservas = resRes.data
                let reservasFiltradas = reservas.filter(reserva => reserva.objetoReserva == objeto.id)
                reservasFiltradas.map(async (reserva) => {
                    await axios.delete(`${URIreserva}${reserva.id}`)
                })
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
        }
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
                            <img src={almacenDefault} style={{width: '100%', height:'100%', objectFit:'contain'}} className="card-img-top img-fluid"></img>:
                            <img src={almacen.foto} style={{width: '100%', height:'100%', objectFit:'contain'}} className="card-img-top img-fluid"></img>
                            }
                            <div className="card-body">
                                <h2 className="card-title">{almacen.nombre}</h2>
                                <Link to={`/${idUser}/${almacen.id}`} className='btn' style={{backgroundColor:'#54A6F0', color: 'black'}}>Acceder</Link> 
                                <button className="ms-2 btn" style={{backgroundColor:'#EF726B'}} onClick={ ()=>deleteAlmacen(almacen.id)}>Borrar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default CompShowMisAlmacenes