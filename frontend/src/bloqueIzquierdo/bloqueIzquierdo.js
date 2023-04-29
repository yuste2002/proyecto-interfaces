import { useParams, Link } from "react-router-dom"

const CompBloqueIzquierdo = () => {
    const {idUser} = useParams()

    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Link to={`/${idUser}/createAlmacen`} className='btn mt-4 mb-2' style={{backgroundColor:'#54A6F0', color: 'black', width: '200px'}}><i class="fa-duotone fa-plus"></i> Nuevo Almacen</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Link to={`/${idUser}`} className='btn btn-primary mt-2 mb-2' style={{backgroundColor:'#54A6F0', color: 'black', width: '200px'}} >Mis almacenes</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Link to={`/${idUser}/compartidos`} className='btn btn-primary mt-2 mb-2' style={{backgroundColor:'#54A6F0', color: 'black', width: '200px'}}>Compartidos conmigo</Link>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default CompBloqueIzquierdo