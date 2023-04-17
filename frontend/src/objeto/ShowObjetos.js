import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'

const URIobjetos = "http://localhost:8000/objetos/"

const CompShowObjetos = () => {
    const {idAlmacen} = useParams()
    const {idUser} = useParams()

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

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-1">
                    <h1>Objetos</h1>
                </div>
                <div className="col-md-10"/>
                <div className="col-md-1">
                    <h1>Buscador</h1>
                </div>
            </div>
            { objetos.map ( (objeto) => (
                    <div className="row">
                        <div className="col badge rounded-pill bg-primary" key={objeto.id}>
                            <h2>{objeto.nombre}</h2>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default CompShowObjetos