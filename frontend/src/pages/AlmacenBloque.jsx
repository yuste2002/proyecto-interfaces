import { useEffect, useState } from "react"
import axios from 'axios'
import CompBloqueIzquierdo from "../bloqueIzquierdo/bloqueIzquierdo";
import CompShowObjetos from "../objeto/ShowObjetos";
import CompShowMiembros from "../miembro/ShowMiembros";
import Navbar from "../navbar/navbar";

import { useParams, Link } from "react-router-dom"

const URIalmacen = 'http://localhost:8000/almacenes/'

function AlmacenBloque () {
    
    const {idUser} = useParams()
    const {idAlmacen} = useParams()

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
        setNombreAlmacen('')
    }

    return(
        <div>
            <Navbar></Navbar>
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <CompBloqueIzquierdo></CompBloqueIzquierdo>
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                {almacen && <h2 className="mt-2">{almacen.nombre}</h2>}
                                {propietarioAlmacen ? <form onSubmit={editarNombreAlmacen}>
                                    <input 
                                        value={nombreAlmacen}
                                        onChange={ (e) => setNombreAlmacen(e.target.value)}
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="(Nuevo nombre)"
                                        />
                                    <button type='submit' className="ms-2 btn mt-1" style={{backgroundColor:'#4175A3'}}>Cambiar</button>
                                </form> : null}
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
        </div>
    )
}

export default AlmacenBloque