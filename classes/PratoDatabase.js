// database/PratoDatabase.js
const Database  = require('./Database');
const model     = require('../models/Prato');
const IngredientsDuplicateCheckStrategy = require('./IngredientsDuplicateCheckStrategy');

class PratoDatabase extends Database {
    constructor() {
        super(model);
        this.duplicateCheckStrategy = new IngredientsDuplicateCheckStrategy()
    }

    async update(data, id) {
        return await this.model.update(data, { where: { ID: id } });
    }

    async remove (id) {
        return await this.model.destroy({ where: { ID: id } });
    }
}

module.exports = PratoDatabase;
