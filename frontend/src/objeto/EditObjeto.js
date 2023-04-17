import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const URIobjeto = "http://localhost:8000/objetos/"

const CompEditObjeto = () => {
    const {idObjeto} = useParams()
    const {idUser} = useParams()
    const navigate = useNavigate()


    const [objeto, setObjeto] = useState()
    useEffect(() => {
        getObjeto()
    },)

    const getObjeto = async (e) => {
        const res = await axios.get(URIobjeto + idObjeto)
        setObjeto(res.data)

        if (!nombre) setNombre(res.data.nombre)
        if (!descripcion) setDescripcion(res.data.descripcion)
        if (!ubicacion) setUbicacion(res.data.ubicacion)
        if (!condiciones) setCondiciones(res.data.condiciones)
    }

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [condiciones, setCondiciones] = useState('')

    const editar = async (e) => {
        e.preventDefault()

        await axios.put(URIobjeto + idObjeto, {
            nombre: nombre,
            descripcion: descripcion,
            ubicacion: ubicacion,
            condiciones: condiciones
        })

        navigate(`/${idUser}/${objeto.almacenAsociado}`)
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>FICHA DE OBJETO</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <form onSubmit={editar}>
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
                        <button type="submit" className='btn btn-primary'>Editar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompEditObjeto