const model = require('../models/PratoXIngrediente');
const Database = require('./Database');
const ing = require('../classes/IngredienteDatabase')

class PratoXIngrediente extends Database {
    constructor() {
        super(model);
        this.ingrediente = new ing()
    }

    // override do método getAll de Database
    async getAll (ID_Prato) {
        return await this.model.findAll({ where: { ID_Prato: ID_Prato } })
    }

    async removeByPlate (ID_Prato) {
        return await this.model.destroy({ where: { ID_Prato: ID_Prato } });
    }
}

module.exports = PratoXIngrediente;