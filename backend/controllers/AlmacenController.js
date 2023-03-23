import AlmacenModel from "../models/AlmacenModel.js";

//MÉTODOS PARA EL CRUD

export const getAllAlmacenes = async (req, res) => {
    try {
        const almacenes = await AlmacenModel.findAll()
        res.json(almacenes)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getAlmacen = async (req, res) => {
    try {
        const almacen = await AlmacenModel.findAll({
            where:{ id:req.params.id}   //Nos pasan el id y lo cogemos haciendo req.params.id
        })
        res.json(almacen[0])
    } catch (error) {
        res.json( {message : error.message} )
    }
}

export const createAlmacen = async (req,res) => {
    try {
        await AlmacenModel.create(req.body)     //Capturamos todo el objeto con req.body
        res.json({                              //Mostramos un json que diga que el almacen se ha creado correctamente
            "message" : "Almacen creado correctamente"
        })
    } catch (error) {
        res.json( {message : error.message} )
    }
}

//Actualizar un aula
export const updateAlmacen = async (req,res) => {
    try {
        await AlmacenModel.update(req.body, {
            where: { id: req.params.id }
        })
        res.json({
            "message":"Almacen actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Eliminar un almacen
export const deleteAlmacen = async (req,res) => {
    try {
        await AlmacenModel.destroy({
            where: { id: req.params.id } 
        })
        res.json({
            "message":"Almacen eliminado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}