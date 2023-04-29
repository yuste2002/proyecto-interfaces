import CompShowMisAlmacenes from "../almacen/ShowMisAlmacenes.js"
import CompBloqueIzquierdo from "../bloqueIzquierdo/bloqueIzquierdo.js"
import { Link, useParams } from "react-router-dom"
import Navbar from "../navbar/navbar.js"

function MisAlmacenesBloque () {
    const {idUser} = useParams()

    return(
        <div>
            <Navbar></Navbar>
            <div className="container-fluid h-100">
                <div className="row">
                    <div className="col-md-2" style={{backgroundColor: '#e6e6e6'}}>
                        <CompBloqueIzquierdo></CompBloqueIzquierdo>
                    </div>
                    <div className="col-md-10">
                        <CompShowMisAlmacenes></CompShowMisAlmacenes>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default MisAlmacenesBloque