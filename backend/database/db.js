import { Sequelize } from "sequelize"

const db = new Sequelize('heroku_a0a28a55b6f2542', 'bdcdb7e5f27034', '5c457d1f', {
    host: "eu-cdbr-west-03.cleardb.net",
    dialect:'mysql'
});

export default db