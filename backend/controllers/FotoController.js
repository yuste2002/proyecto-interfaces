export const getAllFotos = async (req, res) => {
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