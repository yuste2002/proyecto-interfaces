import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'

const URIobjetos = 'https://interfaces-vsr.herokuapp.com/objetos/'

const CompCreateObjetos = () => {
    const {idUser} = useParams()
    const {idAlmacen} = useParams()
    const navigate = useNavigate()
    const [foto, setFoto] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [condiciones, setCondiciones] = useState('')
    const [error, setError] = useState(null)

    const crearObjeto = async (e) => {
        e.preventDefault()
        const res = await axios.get(URIobjetos)
        let objetos = res.data
        const objetoExiste = objetos.find(objeto => nombre == objeto.nombre && objeto.almacenAsociado == idAlmacen) 
        if (objetoExiste == undefined) {
            axios.post((URIobjetos), {
                nombre: nombre,
                descripcion: descripcion,
                ubicacion: ubicacion,
                condiciones: condiciones,
                foto: foto,
                almacenAsociado: idAlmacen,
                propietario: idUser
            })
            navigate(`/${idUser}/${idAlmacen}`)
        } else {
            setError('Ya existe un objeto con este nombre.')
        }
    }

    const volverAtras = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    return(
        <div className='d-flex align-items-center vh-100 fondoLogin container-fluid'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                        <div className='card' style={{padding: '20px', backgroundColor:'rgba(255, 255, 255, 0.8)'}}>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <h1 tabindex="0">NUEVO OBJETO</h1>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <form onSubmit={crearObjeto}>
                                            <div className="mb-3">
                                                <label htmlFor="nombre" className='form-label'>Nombre*</label>
                                                <input
                                                    id="nombre"
                                                    value={nombre}
                                                    onChange={ (e) => setNombre(e.target.value)}
                                                    aria-label="Ingrese el nombre del objeto"
                                                    type="text"
                                                    className="form-control"
                                                    style={{ width: '50%', margin: '0 auto' }}
                                                    required='true'
                                                    title="Ingrese el nombre del objeto"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="foto" className='form-label'>Enlace foto</label>
                                                <input
                                                    id="foto"
                                                    value={foto}
                                                    onChange={ (e) => setFoto(e.target.value)}
                                                    aria-label="Ingrese el enlace de la imagen del objeto"
                                                    type="text"
                                                    className='form-control'
                                                    style={{ width: '75%', margin: '0 auto' }}
                                                    title="Ingrese el enlace de la foto del objeto"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="condiciones" className='form-label'>Condiciones</label>
                                                <textarea id="condiciones" cols={30} rows={5} 
                                                    value={condiciones} 
                                                    onChange={ (e) => setCondiciones(e.target.value)}
                                                    aria-label="Ingrese el las condiciones de reserva del objeto"
                                                    style={{ width: '75%', margin: '0 auto' }}
                                                    className="form-control"
                                                    title="Ingrese las condiciones del objeto"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="descripcion" className='form-label'>Descripcion</label>
                                                <textarea id="descripcion" cols={30} rows={5} 
                                                    value={descripcion} 
                                                    onChange={ (e) => setDescripcion(e.target.value)}
                                                    aria-label="Ingrese la descripcion del objeto"
                                                    style={{ width: '75%', margin: '0 auto' }}
                                                    className="form-control"
                                                    title="Ingrese la descripcion del objeto"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="ubicacion" className='form-label'>Ubicacion*</label>
                                                <input
                                                    id="ubicacion"
                                                    value={ubicacion}
                                                    onChange={ (e) => setUbicacion(e.target.value)}
                                                    aria-label="Ingrese la ubicacion del objeto"
                                                    type="text"
                                                    className="form-control"
                                                    style={{ width: '50%', margin: '0 auto' }}
                                                    required='true'
                                                    title="Ingrese la ubicacion del objeto"    
                                                />
                                            </div>
                                            {error && (
                                                <div className='row'>
                                                    <div className='col'>
                                                        <div className='alert alert-danger mt-4' role='alert'>
                                                            {error}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <button type="submit" className='btn primario' tabindex="0">Añadir</button> <br/>
                                            <button onClick={volverAtras} className='btn btn-secondary mt-2' tabindex="0">Volver atrás</button>
                                        </form>
                                    </div>
                                </div>
                            </div>          
                        </div>
                    </div>
                    <div className='col-md-2'></div>
                </div>
            </div>
        </div>
        
    )
}

export default CompCreateObjetos