import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from 'axios'

const URIalmacen = 'http://localhost:8000/almacenes/'

const CompShowUsuario = () => {
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

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <Link to={`/${idUser}/createAlmacen`} className='btn btn-primary mt-2 mb-2'><i class="fa-duotone fa-plus"></i></Link>
                </div>
                <div className="col">
                    <Link to={`/${idUser}/editUser`} className='btn btn-primary mt-2 mb-2'><i class="fa-solid fa-user-ninja"></i></Link>
                </div>
            </div>
            <div className="row">
                { almacenes.map ( (almacen) => (
                    <div className="col badge rounded-pill bg-primary" key={almacen.id}>
                        <h2>{almacen.nombre}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CompShowUsuario