//importamos la conexion a la bd
import db from "../database/db.js";

import { DataTypes } from "sequelize";

/**
 * Con esta clase hacemos el "mapeo" de la bd.
 * Creamos el modelo usuario con los atributos definidos en la base de datos
 * salvo el id, createdAt y updatedAt
 */

const UsuarioModel = db.define('usuarios', {
    nombreUsuario: { type: DataTypes.STRING },
    correo: { type: DataTypes.STRING},
    contrasena: { type: DataTypes.STRING},
    nombre: { type: DataTypes.STRING},
    apellido: { type: DataTypes.STRING}
})

export default UsuarioModel