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
            <div className="row">
                <div className="col-md-1">
                    <h2>Objetos</h2>
                </div>
                <div className="col-md-11"/>
            </div>
            <div className="row">
                <div className="col" style={{overflow: 'auto'}}>
                    { objetos.map ( (objeto) => (
                        <div className="row">
                            <div className="col badge rounded-pill bg-primary mb-2" key={objeto.id}>
                                <h3>{objeto.nombre}</h3>
                                <div className="col">
                                <Link to={`/objeto/${objeto.id}/${idUser}`} className='btn btn-info mt-2 mb-2'>Reservar o gestionar</Link>
                                {propietarioAlmacen || objeto.propietario == idUser ? 
                                <button className="ms-2" onClick={()=>deleteObjeto(objeto.id)}><i class="fa-sharp fa-solid fa-trash"></i></button> : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Link to={`/${idAlmacen}/${idUser}/createObjeto`} className='btn btn-primary mt-2 mb-2'>Añadir</Link>
        </div>
    )
}

export default CompShowObjetos