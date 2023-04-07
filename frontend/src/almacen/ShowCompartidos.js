import { useParams } from "react-router-dom"

const URIinvitacion = 'http://localhost:8000/invitaciones/'
const URIalmacen = 'http://localhost:8000/almacenes/'

//NO SE SI FURULA   

const CompShowCompartidos = () => {
    const {idUser} = useParams()

    const [almacenes, setAlmacenes] = useState([])
    useEffect( () => {
        getAlmacenes()
    })

    const getAlmacenes = async () => {
        //Pillo todas las invitaciones de la bd
        const res_invit = await axios.get(URIinvitacion)
        let invitaciones = res_invit.data

        //Obtengo mis invitaciones
        let mis_invitaciones = invitaciones.filter(invitacion => invitacion.usuario == idUser)
        
        //Creo un array con los id de los almacenes que son compartidos conmigo
        let mis_almacenes_compartidos_id
        for (var invitacion of mis_invitaciones) {
            mis_almacenes_compartidos_id.append(invitacion.almacen)
        }

        //Obtengo todos los almacenes de la bd
        const res_almac = await axios.get(URIalmacen)
        let almacenes = res_almac.data 

        //Filtro los almacenes por el id del array creado y obtengo los mios (obtengo el objeto como tal)
        let mis_compartidos = almacenes.filter(almacen => mis_almacenes_compartidos_id.includes(almacen.id))
        
        setAlmacenes(mis_compartidos)
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
                <div className="col">
                <Link to={`/${idUser}/createAlmacen`} className='btn btn-primary mt-2 mb-2'><i class="fa-duotone fa-plus"></i></Link>
                </div>
            </div>
            <div className="row">
                { almacenes.map ( (almacen) => (
                    <div className="col badge rounded-pill bg-primary" key={almacen.id}>
                        <h2>{almacen.nombre}</h2>
                        <Link to={`/${idUser}/editAlmacen/${almacen.id}`} className='btn btn-info'>Editar</Link> 
                        <button onClick={ ()=>deleteAlmacen(almacen.id)}><i class="fa-sharp fa-solid fa-trash"></i></button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CompShowCompartidos