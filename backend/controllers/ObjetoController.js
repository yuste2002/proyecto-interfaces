import ObjetoModel from "../models/ObjetoModel.js";

export const getAllObjetos = async (req, res) => {
    try {
        const objeto = await ObjetoModel.findAll()
        res.json(objeto)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getObjeto = async (req, res) => {
    try {
        const objeto = await ObjetoModel.findAll({
            where:{ id:req.params.id}   //Nos pasan el id y lo cogemos haciendo req.params.id
        })
        res.json(objeto[0])
    } catch (error) {
        res.json( {message : error.message} )
    }
}


export const createObjeto = async (req,res) => {
    try {
        await ObjetoModel.create(req.body)     //Capturamos todo el objeto con req.body
        res.json({                              //Mostramos un json que diga que el almacen se ha creado correctamente
            "message" : "Objeto creado correctamente"
        })
    } catch (error) {
        res.json( {message : error.message} )
    }
}

//Actualizar un objeto
export const updateObjeto = async (req,res) => {
    try {
        await ObjetoModel.update(req.body, {
            where: { id: req.params.id }
        })
        res.json({
            "message":"Objeto actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Eliminar un almacen
export const deleteObjeto = async (req,res) => {
    try {
        await ObjetoModel.destroy({
            where: { id: req.params.id } 
        })
        res.json({
            "message":"Objeto eliminado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}