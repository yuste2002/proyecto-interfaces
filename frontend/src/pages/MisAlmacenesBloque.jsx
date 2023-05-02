import CompShowMisAlmacenes from "../almacen/ShowMisAlmacenes.js"
import CompBloqueIzquierdo from "../bloqueIzquierdo/bloqueIzquierdo.js"
import { Link, useParams } from "react-router-dom"
import NavbarPer from "../navbar/navbar.js"

function MisAlmacenesBloque () {
    const {idUser} = useParams()

    return(
        <div>
            <NavbarPer idUser={idUser}></NavbarPer>
            <div className="container-fluid h-100">
                <div className="row">
                    <div className="col fondo">
                        <CompShowMisAlmacenes></CompShowMisAlmacenes>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default MisAlmacenesBloque