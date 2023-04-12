import express from "express"
import { createObjeto, deleteObjeto, getAllObjetos, getObjeto, updateObjeto } from "../controllers/ObjetoController.js"


const routerObjeto = express.Router()

routerObjeto.get('/', getAllObjetos)
routerObjeto.get('/:id', getObjeto)
routerObjeto.post('/', createObjeto)
routerObjeto.put('/:id', updateObjeto)
routerObjeto.delete('/:id', deleteObjeto)

export default routerObjeto