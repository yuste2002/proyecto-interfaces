import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'

const URIobjetos = "http://localhost:8000/objetos/"
const URIalmacen = "http://localhost:8000/almacenes/"

const CompShowObjetos = () => {
    const {idAlmacen} = useParams()
    const {idUser} = useParams()
    const navigate = useNavigate()
    
    const [objetos, setObjetos] = useState([])
    useEffect( () => {
        getObjetos()
    },objetos)

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


    const getObjetos = async () => {
        
        const res = await axios.get(URIobjetos)
        let objetos = res.data
        let objetosFiltrados = objetos.filter(objeto => objeto.almacenAsociado == idAlmacen)
        setObjetos(objetosFiltrados)
    }

    const deleteObjeto = async (id) => {
        //HAY QUE HACER EL BORRADO EN CASCADA DE LOS OBJETOS ASOCIADOS AL ALMACEN   
        await axios.delete(`${URIobjetos}${id}`)
        getObjetos()
    }

    return (
        <div className="container">
            {navigate(`/${idUser}/${idAlmacen}`)}
            <div className="row">
                <div className="col-md-1">
                    <h2>Objetos</h2>
                </div>
                <div className="col-md-10"/>
                <div className="col-md-1">
                    <h4>Buscador</h4>
                </div>
            </div>
            { objetos.map ( (objeto) => (
                    <div className="row">
                        <div className="col badge rounded-pill bg-primary" key={objeto.id}>
                            <h3>{objeto.nombre}</h3>
                            <div className="col">
                            <Link to={`/objeto/${objeto.id}/${idUser}`} className='btn btn-outline-dark btn-primary mt-2 mb-2'>Reservar o gestionar</Link>
                            {propietarioAlmacen || objeto.propietario == idUser ? <div><button onClick={()=>deleteObjeto(objeto.id)}><i class="fa-sharp fa-solid fa-trash"></i></button></div> : null}
                            </div>
                        </div>
                    </div>
                ))}
            <Link to={`/${idAlmacen}/${idUser}/createObjeto`} className='btn btn-primary mt-2 mb-2'>Añadir</Link>
        </div>
    )
}

export default CompShowObjetos