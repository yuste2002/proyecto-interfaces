import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const URIalmacen = 'http://localhost:8000/almacenes/'

const CompCreateAlmacen = () => {
    const [name, setName] = useState('')

    const {idUser} = useParams()
    const navigate = useNavigate()

    const crearAula = async (e) => {
        axios.post(URIalmacen, {
            nombre: name, 
            propietario: idUser
        })
        navigate(`/${idUser}`)
    }

    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1>NUEVO ALMACEN</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <form onSubmit={crearAula}>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre</label>
                            <input
                                value={name}
                                onChange={ (e) => setName(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>Crear</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompCreateAlmacen