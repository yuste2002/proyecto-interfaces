import express from "express"
import cors from 'cors'

//Importamos la conexion a la BD
import db from "./database/db.js"

import almacenRoutes from './routes/routesAlmacen.js'
import usuarioRoutes from './routes/routesUsuario.js'
import invitacionRoutes from './routes/routesInvitacion.js'
import objetoRoutes from './routes/routesObjeto.js'
import reservaRoutes from './routes/routesReserva.js'

const app = express()

/**
 * Este archivo lo usamos sobre todo para conectarnos a la bd, definir el puerto en el
 * que se ejecutara el servidor y configurar las rutas para cada Routes (tenemos un routes
 * por cada modelo/entidad)
 */

//Configuraciones
app.use(cors())
app.use(express.json())
app.use('/almacenes', almacenRoutes)
app.use('/usuarios', usuarioRoutes)
app.use('/invitaciones', invitacionRoutes)
app.use('/objetos', objetoRoutes)
app.use('/reservas', reservaRoutes)

const PORT = 3306;

try {
    await db.authenticate()
    console.log('Conexion exitosa a la base de datos')
} catch (error) {
    console.log('El error de conexion es: ${error}')
}

//--//El servidor se ejecuta en el puerto 8000  

app.get('/', (req,res) => {
    res.send('HOLA MUNDO')
})

app.listen(process.env.PORT || PORT, () =>{ 
    console.log('Server UP running on port ${PORT}')  
})