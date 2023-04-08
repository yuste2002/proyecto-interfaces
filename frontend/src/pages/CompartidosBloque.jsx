import CompShowCompartidos from "../almacen/ShowCompartidos.js"
import CompBloqueIzquierdo from "../bloqueIzquierdo/bloqueIzquierdo.js"
import { Link, useParams } from "react-router-dom"

function CompartidosBloque () {
    
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <CompBloqueIzquierdo></CompBloqueIzquierdo>
                </div>
                <div className="col-md-10">
                    <CompShowCompartidos></CompShowCompartidos>
                </div>
            </div>
        </div>
    )
}

export default CompartidosBloque