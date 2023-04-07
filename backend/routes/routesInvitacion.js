import express from "express"
import { createInvitacion, deleteInvitacion, getAllInvitaciones, getInvitacion } from "../controllers/InvitacionController.js"

const routerInvitacion = express.Router()

routerInvitacion.get('/', getAllInvitaciones)
routerInvitacion.get('/:id', getInvitacion)
routerInvitacion.post('/', createInvitacion)
routerInvitacion.delete('/:id', deleteInvitacion)

export default routerInvitacion
