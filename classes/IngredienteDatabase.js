const model = require('../models/Ingrediente');
const Database = require('./Database');

class Ingrediente extends Database {
    constructor() {
        super(model);
    }
}

module.exports = Ingrediente