import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'

const URIalmacen = 'http://localhost:8000/almacenes/'

const CompShowUsuario = () => {
    //Pillo el id del usuario desde la url
    const {id} = useParams()

    const [almacenes, setAlmacenes] = useState([])
    useEffect( () => {
        getAlmacenes()
    },[])
    
    const getAlmacenes = async () => {
        const res = await axios.get(URIalmacen, {propietario: id})
        setAlmacenes(res.data)
    }

    return(
        <div className="container">
            <div className="row">
                { almacenes.map ( (almacen) => (
                    <div className="col" key={almacen.id}>
                        <h2>{almacen.nombre}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CompShowUsuario