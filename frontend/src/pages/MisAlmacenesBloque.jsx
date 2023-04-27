import CompShowMisAlmacenes from "../almacen/ShowMisAlmacenes.jsx"
import CompBloqueIzquierdo from "../bloqueIzquierdo/bloqueIzquierdo.js"
import { Link, useParams } from "react-router-dom"

function MisAlmacenesBloque () {
    const {idUser} = useParams()

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <CompBloqueIzquierdo></CompBloqueIzquierdo>
                </div>
                <div className="col-md-10">
                    <CompShowMisAlmacenes></CompShowMisAlmacenes>
                </div>
            </div>
        </div>
    )
}

export default MisAlmacenesBloque