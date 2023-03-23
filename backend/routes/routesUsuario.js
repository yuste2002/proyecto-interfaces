import express from "express"
import { createUsuario, getAllUsuarios, getUsuario, updateUsuario } from "../controllers/UsuarioController.js"

const routerUsuario = express.Router()

routerUsuario.get('/', getAllUsuarios)
routerUsuario.get('/:id', getUsuario)
routerUsuario.post('/', createUsuario)
routerUsuario.put('/:id', updateUsuario)

export default routerUsuario