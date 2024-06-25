const sequelize = require('sequelize')
const connection = require('../database/index')

const Ingrediente = connection.define('Ingredientes', {
    ID: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nome: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,
    },
}, { tableName: 'tbl_Ingrediente', timestamps: false })

module.exports = Ingrediente