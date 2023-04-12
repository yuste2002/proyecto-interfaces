import db from "../database/db.js"

import { DataTypes } from "sequelize"

const ReservaModel = db.define('reserva', {
    fechaInicio: { type: DataTypes.DATE },
    fechaFin: { type: DataTypes.DATE }, 
    usuarioReserva: { type: DataTypes.INTEGER },
    objetoReserva: { type: DataTypes.INTEGER} 
})

export default ReservaModel