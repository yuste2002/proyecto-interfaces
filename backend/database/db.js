import { Sequelize } from "sequelize"

const db = new Sequelize('vsr', 'root', 'Paproka123.', {
    host:'localhost',
    dialect:'mysql'
}) 

export default db