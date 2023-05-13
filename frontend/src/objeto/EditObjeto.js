import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const URIobjeto = "https://interfaces-vsr.herokuapp.com/objetos/"
const URIalmacen = 'https://interfaces-vsr.herokuapp.com/almacenes/'
const URIusuarios = 'https://interfaces-vsr.herokuapp.com/usuarios/'

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
        if (!foto) setFoto(res.data.foto)
    }

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [condiciones, setCondiciones] = useState('')
    const [foto, setFoto] = useState('')

    const editar = async (e) => {
        e.preventDefault()

        await axios.put(URIobjeto + idObjeto, {
            nombre: nombre,
            descripcion: descripcion,
            ubicacion: ubicacion,
            condiciones: condiciones,
            foto: foto
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
                    <h1 tabIndex="0">FICHA DE OBJETO</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h2 tabIndex="0">Objeto de: {dueno.nombre}</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <form onSubmit={editar}>
                        <div className="mb-3">
                            <div className="row">
                                    <div className='col-md-3'></div>
                                    <div className='col-md-6'>
                                    <label className='form-label' tabIndex="0" htmlFor="nombre">Nombre*</label>
                                        {propietario ? 
                                        <input required
                                        id="nombre"
                                        value={nombre}
                                        onChange={ (e) => setNombre(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        aria-label="Ingrese el nombre del objeto"
                                        /> :
                                            <input
                                            id="nombre"
                                            value={nombre}
                                            type="text"
                                            className="form-control bg-light"
                                            readonly
                                            aria-label="Ingrese el nombre del objeto"
                                            />
                                        }
                                    </div>
                                    <div className='col-md-3'></div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className='form-label' tabIndex="0" htmlFor="condiciones">Condiciones</label>
                            {propietario ?
                            <textarea cols={30} rows={5}
                                id="condiciones"
                                value={condiciones} 
                                onChange={ (e) => setCondiciones(e.target.value)}
                                aria-label="Ingrese el las condiciones de reserva del objeto"
                                className="form-control"/> :
                                <textarea cols={30} rows={5}
                                    id="condiciones" 
                                    value={condiciones} 
                                    className="form-control bg-light" readonly
                                    />
                            }
                        </div>

                        <div className="mb-3">
                            <label className='form-label' tabIndex="0" htmlFor="descripcion">Descripcion</label>
                            {propietario ?
                            <textarea cols={30} rows={5} 
                                id="descripcion"
                                value={descripcion} 
                                onChange={ (e) => setDescripcion(e.target.value)}
                                aria-label="Ingrese la descripcion del objeto"
                                className="form-control"/> :
                                <textarea cols={30} rows={5} 
                                    id="descripcion"
                                    value={descripcion} 
                                    className="form-control bg-light" readonly
                                    />
                                    
                            }
                        </div>

                        <div className="mb-3">
                            <label htmlFor="foto" className='form-label'>Enlace foto</label>
                            {propietario ? 
                            <input
                                id="foto"
                                value={foto}
                                onChange={ (e) => setFoto(e.target.value)}
                                aria-label="Ingrese el enlace de la imagen del objeto"
                                type="text"
                                className='form-control'
                                style={{ width: '75%', margin: '0 auto' }}
                                title="Ingrese el enlace de la foto del objeto"
                            /> :
                                <input
                                id="foto"
                                value={foto}
                                aria-label="Ingrese el enlace de la imagen del objeto"
                                type="text"
                                className="form-control bg-light" readonly
                                style={{ width: '75%', margin: '0 auto' }}
                                title="Ingrese el enlace de la foto del objeto"
                            />}
                                                
                        </div>

                        <div className="mb-3">
                                <div className='row'>
                                    <div className='col-md-3'></div>
                                    <div className='col-md-6'>
                                    <label className='form-label' tabIndex="0" htmlFor="ubicacion">Ubicacion</label>
                                        <input
                                        id="ubicacion"
                                        value={ubicacion}
                                        onChange={ (e) => setUbicacion(e.target.value)}
                                        aria-label="Ingrese la ubicacion del objeto"
                                        type="text"
                                        className="form-control"
                                        /> 
                                    </div>
                                    <div className='col-md-3'></div>
                                </div> 
                        </div>

                        <button type="submit" className='btn primario' tabIndex="0" aria-label="Botón de guardar">Guardar</button> <br/>
                        <button onClick={volverAtras} className='btn btn-secondary mt-2' tabIndex="0" aria-label="Botón de volver atrás"> Volver atrás</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompEditObjeto