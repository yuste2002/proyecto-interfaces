import { useEffect, useState } from "react"
import axios from 'axios'
import CompBloqueIzquierdo from "../bloqueIzquierdo/bloqueIzquierdo";
import CompShowObjetos from "../objeto/ShowObjetos";
import CompShowMiembros from "../miembro/ShowMiembros";

import { useParams, Link } from "react-router-dom"

const URIalmacen = 'http://localhost:8000/almacenes/'

function AlmacenBloque () {
    
    const {idUser} = useParams()
    const {idAlmacen} = useParams()

    const [almacen, setAlmacen] = useState()
    useEffect(() => {
        getAlmacen()
    },)

    const [nombreAlmacen, setNombreAlmacen] = useState()
    

    const getAlmacen = async () => {
        const res = await axios.get(URIalmacen + idAlmacen)
        let almacen = res.data
        setAlmacen(almacen)
    }
    
    const editarNombreAlmacen = async (e) => {
        e.preventDefault()

        await axios.put(URIalmacen + idAlmacen, {
            nombre: nombreAlmacen
        })
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <CompBloqueIzquierdo></CompBloqueIzquierdo>
                </div>
                <div className="col-md-10">
                    <div className="row">
                        <div className="col-md-1">
                            <h1>Buscador</h1>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-6">
                            <form onSubmit={editarNombreAlmacen}>
                            <label className='form-label mt-3'>Nombre almacen</label>
                                <input 
                                    value={nombreAlmacen}
                                    onChange={ (e) => setNombreAlmacen(e.target.value)}
                                    type="text"
                                    className="form-control form-control-sm"/>
                            </form>
                            
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-1">
                            <Link to={`/${idUser}/editUser`} className='btn btn-primary mt-2 mb-2'><i class="fa-solid fa-user-ninja"></i></Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 mt-3">
                            <CompShowObjetos></CompShowObjetos>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 mt-3">
                            <CompShowMiembros/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlmacenBloque