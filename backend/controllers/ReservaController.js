import ReservaModel from "../models/ReservaModel.js";

export const getAllReservas = async (req, res) => {
    try {
        const reservas = await ReservaModel.findAll()
        res.json(reservas)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getReserva = async (req, res) => {
    try {
        const reserva = await ReservaModel.findAll({
            where:{ id:req.params.id}
        })
        res.json(reserva[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const createReserva = async (req, res) => {
    try {
        await ReservaModel.create(req.body)
        res.json({
            "message" : "Reserva creada correcramente"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const deleteReserva = async (req, res) => {
    try {
        await ReservaModel.destroy({
            where: { id: req.params.id }
        })
        res.json({
            "message" : "Reserva eliminada correctamente"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}