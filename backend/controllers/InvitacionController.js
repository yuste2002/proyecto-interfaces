import InvitacionModel from "../models/InvitacionModel.js"

export const getAllInvitaciones = async (req, res) => {
    try{
        const invitaciones = await InvitacionModel.findAll()
        res.json(invitaciones)
    } catch (error) {
        res.json( {message: error.message} )
    }
}
export const getInvitacion = async (req, res) => {
    try {
        const invitacion = await InvitacionModel.findAll({
            where:{ id:req.params.id}
        })
        res.json(invitacion[0])
    } catch (error) {
        res.json( {message: error.message} ) 
    }
}

export const createInvitacion = async (req, res) => {
    try {
        await InvitacionModel.create(req.body)
        res.json({
            "message" : "Invitacion creada correctamente"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const deleteInvitacion = async (req, res) => {
    try {
        await InvitacionModel.destroy({
            where: { id: req.params.id }
        })
        res.json({
            "message" : "Invitacion eliminada correctamente"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}
