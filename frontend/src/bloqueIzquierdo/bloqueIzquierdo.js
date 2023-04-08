import { useParams, Link } from "react-router-dom"

const CompBloqueIzquierdo = () => {
    const {idUser} = useParams()

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <Link to={`/${idUser}/createAlmacen`} className='btn btn-primary mt-2 mb-2'><i class="fa-duotone fa-plus"></i> Nuevo Almacen</Link>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to={`/${idUser}`} className='btn btn-primary mt-2 mb-2'>Mis almacenes</Link>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to={`/${idUser}/compartidos`} className='btn btn-primary mt-2 mb-2'>Compartidos conmigo</Link>
                </div>
            </div>
        </div>
    )
}

export default CompBloqueIzquierdo