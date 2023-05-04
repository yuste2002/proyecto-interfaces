import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const URIalmacen = 'https://interfaces-vsr.herokuapp.com/almacenes/'

const CompEditAlmacen = () => {
    const [name, setName] = useState('')

    const {idAlmacen} = useParams()
    const navigate = useNavigate()

    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h2>Vista editar</h2>
                </div>
            </div>
        </div>
    )
}

export default CompEditAlmacen