import { Sequelize } from "sequelize"

const db = new Sequelize('vsr', 'root', 'alvaro21112002', {
    host:'localhost',
    dialect:'mysql'
}) 

export default db