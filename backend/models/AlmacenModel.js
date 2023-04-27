//importamos la conexion a la bd
import db from "../database/db.js";

import { DataTypes } from "sequelize";

/**
 * Podemos usar el estandar de: nombre de modelo -> Trastero | nombre tabla -> trasteros
 */

//Definimos el modelo, 'trastero' debe de ser el nombre de la tabla en la base de datos
const AlmacenModel = db.define('almacen', {
    nombre: { type: DataTypes.STRING },
    propietario: { type: DataTypes.STRING},
    foto: {type: DataTypes.STRING}
})

export default AlmacenModel