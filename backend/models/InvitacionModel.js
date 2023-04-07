import { DataTypes } from "sequelize"
import db from "../database/db.js"

const InvitacionModel = db.define('invitado', {
    usuario: { type: DataTypes.INTEGER },
    almacen: { type: DataTypes.INTEGER }
})

export default InvitacionModel