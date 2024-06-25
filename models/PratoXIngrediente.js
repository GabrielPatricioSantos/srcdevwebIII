const sequelize = require('sequelize')
const connection = require('../database/index')

const PratoXIngrediente = connection.define('PratoXIngrediente', {
    ID_Prato: {
        type: sequelize.INTEGER,
        primaryKey: true,
    },
    ID_Ingrediente: {
        type: sequelize.INTEGER,
        primaryKey: true,
    },
    Porcao: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    Tipo_Porcao: {
        type: sequelize.INTEGER,
        allowNull: false
    },
}, { tableName: 'tbl_PratoXIngrediente', timestamps: false })

module.exports = PratoXIngrediente