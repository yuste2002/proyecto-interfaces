import express from "express"
import { createAlmacen, deleteAlmacen, getAllAlmacenes, getAlmacen, updateAlmacen } from "../controllers/AlmacenController.js"

const routerAlmacen = express.Router()

routerAlmacen.get('/', getAllAlmacenes)
routerAlmacen.get('/:id', getAlmacen)
routerAlmacen.post('/', createAlmacen)
routerAlmacen.put('/:id', updateAlmacen)
routerAlmacen.delete('/:id', deleteAlmacen)

export default routerAlmacen 