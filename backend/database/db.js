import { Sequelize } from "sequelize"

const db = new Sequelize('vsr', 'root', 'guapita1', {
    host:'localhost',
    dialect:'mysql'
}) 

export default db