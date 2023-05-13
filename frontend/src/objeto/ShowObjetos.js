import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'
import objetoDefault from '../imagenes/objectDefault.jpg'


const URIobjetos = "https://interfaces-vsr.herokuapp.com/objetos/"
const URIalmacen = "https://interfaces-vsr.herokuapp.com/almacenes/"
const URIreservas = "https://interfaces-vsr.herokuapp.com/reservas/"

const CompShowObjetos = () => {
    const {idAlmacen} = useParams()
    const {idUser} = useParams()
    const navigate = useNavigate()
    
    const [objetos, setObjetos] = useState([])
    useEffect( () => {
            getObjetos()
    },[])

    const getObjetos = async () => {
        const res = await axios.get(URIobjetos)
        let objetos = res.data
        let objetosFiltrados = objetos.filter(objeto => objeto.almacenAsociado == idAlmacen)
        setObjetos(objetosFiltrados)
    }

    const [propietarioAlmacen, setPropietarioAlmacen] = useState(false) 
    useEffect( () => {
            getPropietarioAlmacen()      
    },[])

    const getPropietarioAlmacen = async () => {
        const res = await axios.get(URIalmacen + idAlmacen)
        let almacen = res.data
        if(almacen.propietario == idUser) {
            setPropietarioAlmacen(true)
        } else {
            setPropietarioAlmacen(false)
        }
    }

    
    const deleteObjeto = async (id) => {
        const confirmarBorrar = window.confirm("¿Estás seguro de que quieres borrar este objeto?");
        if (confirmarBorrar) {
            //HAY QUE HACER EL BORRADO EN CASCADA DE LOS OBJETOS ASOCIADOS AL ALMACEN   
            //Antes de borrar el objeto borro sus reservas asociadas
            const resRes = await axios.get(URIreservas)
            let reservas = resRes.data
            let reservasFiltradas = reservas.filter(reserva => reserva.objetoReserva == id)
            reservasFiltradas.map(async (reserva) => {
                await axios.delete(`${URIreservas}${reserva.id}`)
            })
            await axios.delete(`${URIobjetos}${id}`)
        }
        getObjetos()
    }

    return (
        <div className="container mb-4">
            <div className="row">
                <div className="col-md-1">
                    <h1 tabindex="0">Objetos</h1>
                </div>
                <div className="col-md-11"/>
            </div>
            <div className="row row-cols-1">
                { objetos.map ( (objeto) => (
                    <div className="col" key={objeto.id}>
                        <div className="card mb-4">
                            <div className="card-body" >
                                <div className="row align-items-center">
                                    <div className="col-md-4">
                                        {objeto.foto == "" || objeto.foto == undefined ? 
                                        <img alt="Foto objeto predeterminada" src={objetoDefault} style={{width: '70%', borderRadius:'5px'}} className="card-img-top img-fluid"></img>:
                                        <img alt="Foto objeto personalizada" src={objeto.foto} style={{width: '70%', borderRadius:'5px'}} className="card-img-top img-fluid"></img>
                                        }
                                    </div>
                                    <div className="col-md-8">
                                        <h3 tabindex="0">{objeto.nombre}</h3>
                                        <div className="col">
                                            <Link to={`/objeto/${objeto.id}/${idUser}`} className='btn primario' tabindex="0">Reservar/Gestionar</Link>
                                            {propietarioAlmacen || objeto.propietario == idUser ? 
                                            <button className="ms-2 btn rojo" onClick={()=>deleteObjeto(objeto.id)}tabindex="0">Borrar</button> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Link to={`/${idAlmacen}/${idUser}/crearObjeto`} className='btn primario'>Añadir objeto</Link>
        </div>
    )
}

export default CompShowObjetos