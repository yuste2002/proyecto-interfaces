import AlmacenModel from "../models/AlmacenModel.js";
import UsuarioModel from "../models/UsuarioModel.js";

/**
 * En el controlador creamos los metodos con los que realizaremos las consultas en el backend.
 * Devolvemos un json con los datos de la consulta en el caso de los findAll.
 */
//MÉTODOS PARA EL CRUD


export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.findAll()
        res.json(usuarios)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getUsuario = async (req, res) => {
    try {
        const usuario = await UsuarioModel.findAll({
            where:{ id:req.params.id}   //Nos pasan el id y lo cogemos haciendo req.params.id
        })
        res.json(usuario[0])
    } catch (error) {
        res.json( {message : error.message} )
    }
}

export const getUsuarioLogin = async (req, res) => {
    try {
        const usuario = await UsuarioModel.findAll({
            where:{ nombreUsuario:req.params.nombreUsuario,
                    contrasena:req.params.contrasena
            }   //Nos pasan el id y lo cogemos haciendo req.params.id
        })
        res.json(usuario[0])
    } catch (error) {
        res.json( {message : error.message} )
    }
}

export const createUsuario = async (req,res) => {
    try {
        await UsuarioModel.create(req.body)     //Capturamos todo el objeto con req.body
        res.json({                              //Mostramos un json que diga que el almacen se ha creado correctamente
            "message" : "Usuario registrado correctamente"
        })
    } catch (error) {
        res.json( {message : error.message} )
    }
}

//Actualizar un aula
export const updateUsuario = async (req,res) => {
    try {
        await UsuarioModel.update(req.body, {
            where: { id: req.params.id }
        })
        res.json({
            "message":"Usuario actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Metodo de papro para el login
export const getByNameAndPassword = async (req,res) => {
    try{
        const user = await UsuarioModel.findOne({
            where: {nombreUsuario: req.params.nombreUsuario, 
                contrasena: req.params.contrasena}
        });
        console.log(user.dataValues.id)
        res.json(user.dataValues.id)
    }catch(error){
        res.json({message : error.message})
    }
}

export const deleteUsuario = async (req,res) => {
    try{
        await UsuarioModel.delete(req.body, {
            where: {id : req.params.id}
        })
        res.json({
            "message":"Deleted"
        })
    }catch(error){
        res.json( {message: error.message} )
    }
}  
