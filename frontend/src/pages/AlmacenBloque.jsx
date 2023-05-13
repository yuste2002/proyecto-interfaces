import { useEffect, useState } from "react"
import axios from 'axios'
import CompBloqueIzquierdo from "../bloqueIzquierdo/bloqueIzquierdo";
import CompShowObjetos from "../objeto/ShowObjetos";
import CompShowMiembros from "../miembro/ShowMiembros";
import NavbarPer from "../navbar/navbar";

import { useParams, Link } from "react-router-dom"

const URIalmacen = 'https://interfaces-vsr.herokuapp.com/almacenes/'

function AlmacenBloque () {
    
    const {idUser} = useParams()
    const {idAlmacen} = useParams()
    const [error, setError] = useState(null)

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
        const res = await axios.get(URIalmacen)
        let almacenesData = res.data
        const alamacenExiste = almacenesData.find(almacen => nombreAlmacen == almacen.nombre && almacen.propietario == idUser)
        if (alamacenExiste == undefined) {
            await axios.put(URIalmacen + idAlmacen, {
                nombre: nombreAlmacen
            })
            setNombreAlmacen('')
            window.location.reload()
        } else {
            setError('Ya existe un almacen con este nombre.')
        }
        
    }

    return(
        <div>
            <NavbarPer idUser={idUser}></NavbarPer>
            <div className="container-fluid h-100">
                <div className="row">
                    <div className="col fondo">
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-xl-6">
                                {almacen && <h1 className="mt-2">Almacen: {almacen.nombre}</h1>}
                                {propietarioAlmacen ? <form onSubmit={editarNombreAlmacen}>
                                <div className="row mt-4 align-items-center">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-5">
                                        <input 
                                            value={nombreAlmacen}
                                            onChange={ (e) => setNombreAlmacen(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            placeholder="(Nuevo nombre)"
                                            style={{ width: '100%'}}
                                            aria-label="Ingresar nuevo nombre de almacen"
                                            title="Ingresar nuevo nombre de almacen"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <button type='submit' className="ms-2 btn primario">Cambiar nombre</button>
                                    </div>
                                    <div className="col-md-2"></div>
                                </div>
                                </form> : null}
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {error && (
                                <div className='row'>
                                    <div className='col'>
                                        <div className='alert alert-danger mt-4' role='alert'>
                                            {error}
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div>
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