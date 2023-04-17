import { Sequelize } from "sequelize"

const db = new Sequelize('vsr', 'root', 'Plk1plk1plk1', {
    host:'localhost',
    dialect:'mysql'
}) 

export default db

//Probando