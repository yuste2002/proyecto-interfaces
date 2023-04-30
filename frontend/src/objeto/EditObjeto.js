import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const URIobjeto = "http://localhost:8000/objetos/"
const URIalmacen = 'http://localhost:8000/almacenes/'
const URIusuarios = 'http://localhost:8000/usuarios/'

const CompEditObjeto = () => {
    const {idObjeto} = useParams()
    const {idUser} = useParams()

    const [dueno, setDueno] = useState('')
    useEffect( () => {
        getDuenoObjeto()
    },'')

    const getDuenoObjeto = async () => {
        const res = await axios.get(URIobjeto+idObjeto)
        const res2 = await axios.get(URIusuarios)

        let objeto = res.data
        let usuarios = res2.data

        let usuarioFiltrado = usuarios.find(usuario => usuario.id == objeto.propietario)
        setDueno(usuarioFiltrado)
    }

    const [almacen, setAlmacen] = useState('')
    useEffect( () => {
        getAlmacen()
    },'')

    const getAlmacen = async () => {
        const res = await axios.get(URIalmacen)
        const res2 = await axios.get(URIobjeto+idObjeto)
        let almacens = res.data
        let objeto = res2.data

        let almacenFiltrado = almacens.find(almacen => almacen.id === objeto.almacenAsociado)
        
        setAlmacen(almacenFiltrado)
    }

    const [propietario, setPropietario] = useState(false)
    useEffect( () => {
        getIsPropietario(idUser)
    },false) //Mirar este

    const getIsPropietario = async(idUser) => {
        const res = await axios.get(URIobjeto+idObjeto)
        let objeto = res.data

        if (idUser == objeto.propietario || idUser == almacen.propietario){
            setPropietario(true)
        }else{
            setPropietario(false)
        }
        console.log(propietario)
    }

    const navigate = useNavigate()


    const [objeto, setObjeto] = useState()
    useEffect(() => {
        getObjeto()
    },'')

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

    const volverAtras = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    return(
        <div className="container mt-3">
            <div className="row">
                <div className="col">
                    <h1>FICHA DE OBJETO</h1>
                    <h5>Objeto de: {dueno.nombre}</h5>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <form onSubmit={editar}>
                        <div className="mb-3">
                            <div className="row">
                                    <div className='col-md-3'></div>
                                    <div className='col-md-6'>
                                    <label className='form-label'>Nombre</label>
                                        {propietario ? 
                                        <input
                                        value={nombre}
                                        onChange={ (e) => setNombre(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        /> :
                                        <input
                                            value={nombre}
                                            type="text"
                                            className="form-control bg-light"
                                            readonly
                                        />
                                        }
                                    </div>
                                    <div className='col-md-3'></div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className='form-label'>Condiciones</label>
                            {propietario ?
                            <textarea cols={30} rows={5} //DEJA EDITAR AUNQUE NO SEAS PROPIETARIO PERO NO GUARDA
                                value={condiciones} 
                                onChange={ (e) => setCondiciones(e.target.value)}
                                className="form-control"/> :
                                <textarea cols={30} rows={5} 
                                    value={condiciones} 
                                    className="form-control bg-light" readonly/>
                            }
                        </div>

                        <div className="mb-3">
                            <label className='form-label'>Descripcion</label>
                            {propietario ?
                            <textarea cols={30} rows={5} 
                                value={descripcion} 
                                onChange={ (e) => setDescripcion(e.target.value)}
                                className="form-control"/> :
                                <textarea cols={30} rows={5} 
                                    value={descripcion} 
                                    className="form-control bg-light" readonly/>
                            }
                        </div>

                        <div className="mb-3">
                                <div className='row'>
                                    <div className='col-md-3'></div>
                                    <div className='col-md-6'>
                                    <label className='form-label'>Ubicacion</label>
                                        <input
                                        value={ubicacion}
                                        onChange={ (e) => setUbicacion(e.target.value)}
                                        type="text"
                                        className="form-control"/> 
                                    </div>
                                    <div className='col-md-3'></div>
                                </div> 
                        </div>

                        <button type="submit" className='btn btn-primary'>Guardar</button> <br/>
                        <button onClick={volverAtras} className='btn btn-secondary mt-2'>Volver atrás</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompEditObjeto