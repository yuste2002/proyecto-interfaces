import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'
import almacenDefault from '../imagenes/almacenDefault.jpg'


const URIinvitacion = 'https://interfaces-vsr.herokuapp.com/invitaciones/'
const URIalmacen = 'https://interfaces-vsr.herokuapp.com/almacenes/'

//NO SE SI FURULA   

const CompShowCompartidos = () => {
    let i = 0
    const {idUser} = useParams()

    const [almacens, setAlmacens] = useState([])
    useEffect( () => {
        getAlmacens()
    },[])


    const getAlmacens = async () => {
        //Pillo todas las invitaciones de la bd
        const res1 = await axios.get(URIinvitacion)
        let invitaciones = res1.data
        
        //Obtengo mis invitaciones
        let mis_invitaciones = invitaciones.filter(invitacion => invitacion.usuario === parseInt(idUser))
        
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
        let mis_compartidos = almacenes.filter(almacen => mis_almacenes_compartidos_id.includes(almacen.id))
        
        setAlmacens(mis_compartidos)
    }

    const salirAlmacen = async (id) => {
        const confirmarSalir = window.confirm("¿Estás seguro de que quieres salir de este almacén?");
        if (confirmarSalir) {
            const res = await axios.get(URIinvitacion)
            let invitados = res.data
            let invitacion = invitados.find(invitado => invitado.usuario == idUser && invitado.almacen == id)
            await axios.delete(`${URIinvitacion}${invitacion.id}`)
        }
        getAlmacens()
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col p-4">
                    <h1 tabindex="0">Compartidos Conmigo</h1>
                </div>
            </div>
            <div className="row row-cols-4">
                { almacens.map ( (almacen) => (
                    <div className="col" key={almacen.id}>
                        <div className="card text-center mb-4">
                            {almacen.foto == undefined ? 
                            <img src={almacenDefault} alt='Imagen almacen' style={{width: '100%', height:'100%', objectFit:'contain'}} className="card-img-top img-fluid"></img>:
                            <img src={almacen.foto} alt='Imagen almacen' style={{width: '100%', height:'100%', objectFit:'contain'}} className="card-img-top img-fluid"></img>
                            }
                            <div className="card-body">
                                <h2 className="card-title" tabindex="0">{almacen.nombre}</h2>
                                <Link to={`/${idUser}/${almacen.id}`} className='btn primario'>Acceder</Link> 
                                <button tabindex="0" className="ms-2 btn rojo"onClick={ () => salirAlmacen(almacen.id)}>Salir</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CompShowCompartidos