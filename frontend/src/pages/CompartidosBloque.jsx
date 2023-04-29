import CompShowCompartidos from "../almacen/ShowCompartidos.js"
import CompBloqueIzquierdo from "../bloqueIzquierdo/bloqueIzquierdo.js"
import { Link, useParams } from "react-router-dom"
import Navbar from "../navbar/navbar.js"

function CompartidosBloque () {
    const {idUser} = useParams()
    return(
        <div>
            <Navbar idUser={idUser}></Navbar>
            <div className="container-fluid h-100">
                <div className="row">
                    <div className="col-md-2 gradient-down">
                        <div>
                            <CompBloqueIzquierdo></CompBloqueIzquierdo>
                        </div>
                    </div>
                    <div className="col-md-10 fondo">
                        <CompShowCompartidos></CompShowCompartidos>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompartidosBloque