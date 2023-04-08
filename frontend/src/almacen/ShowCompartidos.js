import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'

const URIinvitacion = 'http://localhost:8000/invitaciones/'
const URIalmacen = 'http://localhost:8000/almacenes/'

//NO SE SI FURULA   

const CompShowCompartidos = () => {
    const {idUser} = useParams()

    const [almacens, setAlmacens] = useState([])
    useEffect( () => {
        getAlmacens()
    })


    const getAlmacens = async () => {
        //Pillo todas las invitaciones de la bd
        const res1 = await axios.get(URIinvitacion)
        let invitaciones = res1.data

        //Obtengo mis invitaciones
        let mis_invitaciones = invitaciones.filter(invitacion => invitacion.usuario == idUser)
        
        //Creo un array con los id de los almacenes que son compartidos conmigo
        let mis_almacenes_compartidos_id = []
        for (var invitacion of mis_invitaciones) {
            mis_almacenes_compartidos_id.push(invitacion.almacen)
        }

        //Obtengo todos los almacenes de la bd
        const res2 = await axios.get(URIalmacen)
        let almacenes = res2.data 

        //Filtro los almacenes por el id del array creado y obtengo los mios (obtengo el objeto como tal)
        //No se por que los id de mis_almacenes_compartidos_id son Strings. Por lo que en el includes paso los id
        //a string
        let mis_compartidos = almacenes.filter(almacen => mis_almacenes_compartidos_id.includes((almacen.id).toString()))

        setAlmacens(mis_compartidos)
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-1">
                    <h1>buscador</h1>
                </div>
                <div className="col-md-10">
                    <h1>Compartidos Conmigo</h1>
                </div>
                <div className="col-md-1">
                    <Link to={`/${idUser}/editUser`} className='btn btn-primary mt-2 mb-2'><i class="fa-solid fa-user-ninja"></i></Link>
                </div>
            </div>
            <div className="row">
                { almacens.map ( (almacen) => (
                    <div className="col badge rounded-pill bg-primary" key={almacen.id}>
                        <h2>{almacen.nombre}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CompShowCompartidos