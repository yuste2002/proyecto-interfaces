import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from 'axios'
import almacenDefault from '../imagenes/almacenDefault.jpg'


const URIalmacen = 'https://interfaces-vsr.herokuapp.com/almacenes/'
const URIinvitacion = 'https://interfaces-vsr.herokuapp.com/invitaciones/'
const URIobjeto = 'https://interfaces-vsr.herokuapp.com/objetos/'
const URIreserva = 'https://interfaces-vsr.herokuapp.com/reservas/'

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
        const confirmarBorrado = window.confirm("¿Estás seguro de que quieres borrar este almacén? Se borrarán junto a él todos los objetos y reservas que le pertenezcan.");
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
        <html lang="es">
        <div className="container">
            <div className="row">
                <div className="col p-4">
                    <h1 tabindex="0">Mis Almacenes</h1>
                </div>
            </div>
            <div className="row row-cols-4 align-items-center">
                { almacenes.map ( (almacen) => (
                    <div className="col" key={almacen.id}>
                        <div className="card text-center mb-4">
                            {almacen.foto == "" || almacen.foto == undefined ? 
                            <img src={almacenDefault} alt='Imagen almacen'style={{width: '100%', height:'100%', objectFit:'contain'}} className="card-img-top img-fluid"></img>:
                            <img src={almacen.foto} alt='Imagen almacen' style={{width: '100%', height:'100%', objectFit:'contain'}} className="card-img-top img-fluid"></img>
                            }
                            <div className="card-body">
                                <h2 className="card-title" tabindex="0">{almacen.nombre}</h2>
                                <Link to={`/${idUser}/${almacen.id}`} className='btn primario' tabindex="0">Acceder</Link> 
                                <button tabindex="0" className="ms-2 btn rojo"onClick={ ()=>deleteAlmacen(almacen.id)}>Borrar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </html>
    )
}

export default CompShowMisAlmacenes