const sequelize = require('sequelize')
const connection = require('../database/index')

const Imagem = connection.define('Imagem', {
    ID: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nome: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
}, { tableName: 'tbl_Imagem', timestamps: false })

module.exports = Imagem