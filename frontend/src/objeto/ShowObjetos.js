import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'

const URIobjetos = "http://localhost:8000/objetos/"
const URIalmacen = "http://localhost:8000/almacenes/"

const CompShowObjetos = () => {
    const {idAlmacen} = useParams()
    const {idUser} = useParams()
    
    const [objetos, setObjetos] = useState([])
    useEffect( () => {
        getObjetos()
    },[])

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

    return (
        <div className="container">
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
                            {propietarioAlmacen || objeto.propietario == idUser ? <Link to={`/objeto/${objeto.id}/${idUser}`} className='btn btn-primary mt-2 mb-2'>Editar</Link> : null}
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default CompShowObjetos