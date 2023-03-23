import express from "express"
import cors from 'cors'

//Importamos la conexion a la BD
import db from "./database/db.js"

import almacenRoutes from './routes/routesAlmacen.js'
import usuarioRoutes from './routes/routesUsuario.js'

const app = express()

//Configuraciones
app.use(cors())
app.use(express.json())
app.use('/almacenes', almacenRoutes)
app.use('/usuarios', usuarioRoutes)

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

app.listen(8000, () =>{ 
    console.log('Server UP running in http://localhost:8000/')  
})