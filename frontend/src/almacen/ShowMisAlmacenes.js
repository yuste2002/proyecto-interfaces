import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from 'axios'

const URIalmacen = 'http://localhost:8000/almacenes/'

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
        //HAY QUE HACER EL BORRADO EN CASCADA DE LOS OBJETOS ASOCIADOS AL ALMACEN   
        await axios.delete(`${URIalmacen}${id}`)
        getAlmacenes()
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-1">
                    <h1>buscador</h1>
                </div>
                <div className="col-md-10">
                    <h1>Mis Almacenes</h1>
                </div>
                <div className="col-md-1">
                    <Link to={`/${idUser}/editUser`} className='btn btn-primary mt-2 mb-2'><i class="fa-solid fa-user-ninja"></i></Link>
                </div>
            </div>
            <div className="row">
                { almacenes.map ( (almacen) => (
                    <div className="col badge rounded-pill bg-primary" key={almacen.id}>
                        <h2>{almacen.nombre}</h2>
                        <Link to={`/${idUser}/${almacen.id}`} className='btn btn-info'>Editar</Link> 
                        <button onClick={ ()=>deleteAlmacen(almacen.id)}><i class="fa-sharp fa-solid fa-trash"></i></button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CompShowMisAlmacenes