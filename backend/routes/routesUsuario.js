import express from "express"
import { createUsuario, getAllUsuarios, getByNameAndPassword, getUsuario, updateUsuario } from "../controllers/UsuarioController.js"

/**
 * Con esta clase definimos las rutas de las consultas para el modelo de Usuario.
 * Para las consultas usamos las funciones creadas en el controller correspondiente
 */

const routerUsuario = express.Router()

routerUsuario.get('/', getAllUsuarios)
routerUsuario.get('/:id', getUsuario)
routerUsuario.get('/nombreUsuario/:nombreUsuario/contrasena/:contrasena', getByNameAndPassword);
routerUsuario.post('/', createUsuario)
routerUsuario.put('/:id', updateUsuario)

export default routerUsuario