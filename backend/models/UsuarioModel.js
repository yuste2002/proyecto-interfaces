//importamos la conexion a la bd
import db from "../database/db.js";

import { DataTypes } from "sequelize";

const UsuarioModel = db.define('usuarios', {
    nombreUsuario: { type: DataTypes.STRING },
    correo: { type: DataTypes.STRING},
    contrasena: { type: DataTypes.STRING},
    nombre: { type: DataTypes.STRING},
    apellido: { type: DataTypes.STRING}
})

export default UsuarioModel