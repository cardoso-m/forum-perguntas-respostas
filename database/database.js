const Sequelize = require("sequelize")

const connection = new Sequelize('perguntas-respostas', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection