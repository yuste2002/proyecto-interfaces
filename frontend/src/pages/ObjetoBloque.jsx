import CompEditObjeto from "../objeto/EditObjeto"
import CompReservaObjeto from "../objeto/ReservaObjeto"
import CompBloqueIzquierdo from "../bloqueIzquierdo/bloqueIzquierdo"
import Navbar from "../navbar/navbar"

function ObjetoBloque() {
    return (
        <div>
            <Navbar></Navbar>
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <CompBloqueIzquierdo></CompBloqueIzquierdo>
                    </div>
                    <div className="col-md-5">
                        <CompReservaObjeto></CompReservaObjeto>
                    </div>
                    <div className="col-md-5">
                        <CompEditObjeto></CompEditObjeto>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ObjetoBloque