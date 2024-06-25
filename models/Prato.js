const sequelize = require('sequelize')
const connection = require('../database/index')

const Prato = connection.define('Pratos', {
    ID: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nome: {
        type: sequelize.STRING,
        allowNull: false
    },
    Descricao: {
        type: sequelize.TEXT
    },
    Tipo: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    Preco: {
        type: sequelize.FLOAT
    },
    ID_Img: {
        type: sequelize.INTEGER,
        allowNull: true,
        unique: true
    }
}, { tableName: 'tbl_Prato', timestamps: false })

module.exports = Prato