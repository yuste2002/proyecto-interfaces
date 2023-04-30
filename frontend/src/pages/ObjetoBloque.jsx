import CompEditObjeto from "../objeto/EditObjeto"
import CompReservaObjeto from "../objeto/ReservaObjeto"
import CompBloqueIzquierdo from "../bloqueIzquierdo/bloqueIzquierdo"
import { Link, useParams } from "react-router-dom"
import Navbar from "../navbar/navbar"

function ObjetoBloque() {
    const {idUser} = useParams()
    return (
        <div>
            <Navbar idUser={idUser}></Navbar>
            <div className="container-fluid h-100">
                <div className="row">
                    <div className="col-xxl-2 gradient-down">
                        <CompBloqueIzquierdo></CompBloqueIzquierdo>
                    </div>
                    <div className="col-xxl-5 border-end border-dark fondo">
                        <CompReservaObjeto></CompReservaObjeto>
                    </div>
                    <div className="col-xxl-5 border-start border-dark fondo">
                        <CompEditObjeto></CompEditObjeto>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ObjetoBloque