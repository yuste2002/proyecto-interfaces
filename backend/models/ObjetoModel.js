import db from "../database/db.js";

import { DataTypes } from "sequelize";

const ObjetoModel = db.define('objeto',{
    nombre: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING },
    ubicacion: { type: DataTypes.STRING },
    foto: { type: DataTypes.STRING },
    almacenAsociado: { type: DataTypes.INTEGER },
    propietario: { type: DataTypes.INTEGER },
    condiciones: { type: DataTypes.STRING}
})

export default ObjetoModel