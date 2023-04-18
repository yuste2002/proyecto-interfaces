import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'

const URIobjetos = 'http://localhost:8000/objetos/'

const CompCreateObjetos = () => {
    const {idUser} = useParams()
    const {idAlmacen} = useParams()
    const navigate = useNavigate()

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [condiciones, setCondiciones] = useState('')

    const crearObjeto = async (e) => {
        e.preventDefault()
        axios.post((URIobjetos), {
            nombre: nombre,
            descripcion: descripcion,
            ubicacion: ubicacion,
            condiciones: condiciones,
            foto: '',
            almacenAsociado: idAlmacen,
            propietario: idUser
        })
        navigate(`/${idUser}/${idAlmacen}`)
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>NUEVO OBJETO</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <form onSubmit={crearObjeto}>
                        <div className="mb-3">
                            <label className='form-label'>Nombre</label>
                            <input
                                value={nombre}
                                onChange={ (e) => setNombre(e.target.value)}
                                type="text"
                                className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Condiciones</label>
                            <textarea cols={30} rows={5} 
                                    value={condiciones} 
                                    onChange={ (e) => setCondiciones(e.target.value)}
                                    className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Descripcion</label>
                            <textarea cols={30} rows={5} 
                                    value={descripcion} 
                                    onChange={ (e) => setDescripcion(e.target.value)}
                                    className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Ubicacion</label>
                            <input
                                value={ubicacion}
                                onChange={ (e) => setUbicacion(e.target.value)}
                                type="text"
                                className="form-control"/>
                        </div>
                        <button type="submit" className='btn btn-primary'>Añadir</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompCreateObjetos