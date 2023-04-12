import express from "express"
import { createReserva, deleteReserva, getAllReservas, getReserva } from "../controllers/ReservaController.js"

const routerReserva = express.Router()

routerReserva.get('/', getAllReservas)
routerReserva.get('/:id', getReserva)
routerReserva.post('/', createReserva)
routerReserva.delete('/:id', deleteReserva)

export default routerReserva