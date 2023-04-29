import CompShowCompartidos from "../almacen/ShowCompartidos.js"
import CompBloqueIzquierdo from "../bloqueIzquierdo/bloqueIzquierdo.js"
import { Link, useParams } from "react-router-dom"
import Navbar from "../navbar/navbar.js"

function CompartidosBloque () {
    
    return(
        <div>
            <Navbar></Navbar>
            <div className="container-fluid h-100">
                <div className="row">
                    <div className="col-md-2" style={{backgroundColor: '#e6e6e6'}}>
                        <div>
                            <CompBloqueIzquierdo></CompBloqueIzquierdo>
                        </div>
                    </div>
                    <div className="container col-md-10">
                        <CompShowCompartidos></CompShowCompartidos>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompartidosBloque