import CompEditObjeto from "../objeto/EditObjeto"
import CompReservaObjeto from "../objeto/ReservaObjeto"
import CompBloqueIzquierdo from "../bloqueIzquierdo/bloqueIzquierdo"
import Navbar from "../navbar/navbar"

function ObjetoBloque() {
    return (
        <div>
            <Navbar></Navbar>
            <div className="container-fluid h-100">
                <div className="row">
                    <div className="col-md-2" style={{backgroundColor: '#e6e6e6'}}>
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