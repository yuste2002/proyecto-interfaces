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
    }, [])

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
    },'')

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
            <Navbar idUser={idUser}></Navbar>
            <div className="container-fluid h-100">
                <div className="row">
                    <div className="col-xxl-2 gradient-down">
                        <CompBloqueIzquierdo></CompBloqueIzquierdo>
                    </div>
                    <div className="col-xxl-10 fondo">
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-xl-6">
                                {almacen && <h2 className="mt-2">{almacen.nombre}</h2>}
                                {propietarioAlmacen ? <form onSubmit={editarNombreAlmacen}>
                                <div className="row">
                                    <div className="col-md-2"></div>
                                        <div className="col-md-6 mb-3 d-flex justify-content-center align-items-center">
                                        <input 
                                            value={nombreAlmacen}
                                            onChange={ (e) => setNombreAlmacen(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            placeholder="(Nuevo nombre)"
                                            style={{ width: '300px'}}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <button type='submit' className="ms-2 btn" style={{backgroundColor:'#54A6F0'}}>Cambiar</button>
                                        </div>
                                        <div className="col-md-2"></div>
                                    </div>
                                </form> : null}
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-6 mt-3">
                                <CompShowObjetos></CompShowObjetos>
                            </div>
                            <div className="col-md-6 mt-3">
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