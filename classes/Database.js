class Database { // classe abstrata
    constructor(model) {
        this.model = model;
    }

    async get(id) {
        return await this.model.findByPk(id);
    }

    async getAll() {
        return await this.model.findAll();
    }

    async create(data) {
        return await this.model.create(data);
    }

    // métodos abstratos
    async update(id, data) {
        throw new Error('Method not implemented');
    }

    // é implementado pelas subclasses
    async remove(id) {
        throw new Error('Method not implemented');
    }
}

module.exports = Database;