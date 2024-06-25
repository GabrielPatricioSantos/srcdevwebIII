// controllers/pratoController.js
const PratoDatabase = require('../classes/PratoDatabase');
const tipos = ['Menu principal', 'Sobremesas', 'Bebidas não alcoólicas', 'Menu Kids'];
const medidas = ['Gramas', 'Colher de chá', 'Unidade', 'Fatia', 'Ml'];
const PratoXIngredienteDatabase = require('../classes/PratoXIngredienteDatabase');

class PratoController {
    constructor() {
        this.create = this.create.bind(this);
        this.add = this.add.bind(this);
        this.get = this.get.bind(this);
        this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.pratoDatabase     = new PratoDatabase()
        this.imageController   = require('./image')
        this.pratoXingrediente = new PratoXIngredienteDatabase()
    }

    async create(req, res) {
        let pageTitle = 'Cadastrar prato';
        let jsScripts = ['prato.js'];
        let cssStyles = ['prato.css'];
        let ingredientes = await this.pratoXingrediente.ingrediente.getAll();

        return res.render('prato', { pageTitle, cssStyles, jsScripts, Imagem: null, tipos, medidas, ingredientes });
    }

    async add(req, res) {
        try {
            let { nome, descricao, tipo, preco, ingredientes, newIng, porcoes, medidas } = req.body;
            let error;

            if (ingredientes == null) ingredientes = [];

            let pratoData = {
                Nome: nome,
                Descricao: descricao,
                Tipo: tipo,
                Preco: preco
            };

            if (newIng) {
                for (const nome of newIng) {
                    let newIngredient = { Nome: nome };

                    await this.pratoXingrediente.ingrediente.create(newIngredient)
                        .then((ingrediente) => {
                            newIngredient = ingrediente;
                        })
                        .catch((err) => {
                            error = 'Ingrediente já cadastrado!!';
                        });

                    if (error) break;

                    ingredientes.push(newIngredient.ID);
                }
            }

            if (error != null) {
                req.error = error;
                return this.get(req, res);
            }

            const recipe = ingredientes.map((ID_Ingrediente, index) => ({
                ID_Ingrediente,
                Porcao: porcoes[index],
                Tipo_Porcao: medidas[index],
            }));

            let hasDuplicate = this.pratoDatabase.duplicateCheckStrategy.checkDuplicates(recipe);

            if (hasDuplicate) error = 'Ingredientes inválidos!';

            if (req?.file?.filename) pratoData['ID_Img'] = await this.imageController.add("Pratos", req.file.filename);

            if (error != null) {
                req.error = error;
                return this.get(req, res);
            }

            await this.pratoDatabase.create(pratoData)
            .then((prato) => {
                pratoData.ID = prato.ID
            })
            .catch((err) => {
                error = 'Prato não cadastrado!';
            });

            for(const element of recipe) {
                let pratoXing = {
                    ID_Prato: pratoData.ID,
                    ID_Ingrediente: element.ID_Ingrediente,
                    Porcao: element.Porcao,
                    Tipo_Porcao: element.Tipo_Porcao
                };

                await this.pratoXingrediente.create(pratoXing);
            }

            return res.redirect('http://localhost:3000/pratos/');
        } catch (error) {
            return res.status(404).send(error.stack);
        }
    }

    async get(req, res) {
        try {
            let prato = await this.pratoDatabase.get(req.params.id);

            if (prato == null) return res.redirect('http://localhost:3000/pratos');

            let pageTitle = 'Editar prato';
            let jsScripts = ['prato.js'];
            let cssStyles = ['prato.css'];
            let ingredientes = await this.pratoXingrediente.ingrediente.getAll();
            let Imagem;

            if (typeof prato?.ID_Img != 'undefined') Imagem = await this.imageController.get(prato.ID_Img);

            let receita = await this.pratoXingrediente.getAll(prato.ID)

            return res.render('prato', { pageTitle, cssStyles, jsScripts, error: req?.error, tipos, medidas, ingredientes, prato, receita, Imagem });
        } catch (error) {
            return res.status(404).send(error.stack);
        }
    }

    async getAll(req, res) {
        try {
            let pratos = await this.pratoDatabase.getAll();

            return res.render('main', { pratos });
        } catch (error) {
            return res.status(404).send(error.stack);
        }
    }

    async update(req, res) {
        try {
            let { nome, descricao, tipo, preco, ingredientes, newIng, porcoes, medidas } = req.body;
            let error;

            if (ingredientes == null) ingredientes = [];

            let pratoData = {
                Nome: nome,
                Descricao: descricao,
                Tipo: tipo,
                Preco: preco
            };

            if (newIng) {
                for (const nome of newIng) {
                    let newIngredient = { Nome: nome };

                    await this.pratoXingrediente.ingrediente.create(newIngredient)
                        .then((ingrediente) => {
                            newIngredient = ingrediente;
                        })
                        .catch((err) => {
                            error = 'Ingrediente já cadastrado!!';
                        });

                    if (error) break;

                    ingredientes.push(newIngredient.ID);
                }
            }

            if (error != null) {
                req.error = error;
                return this.get(req, res);
            }

            const recipe = ingredientes.map((ID_Ingrediente, index) => ({
                ID_Ingrediente,
                Porcao: porcoes[index],
                Tipo_Porcao: medidas[index],
            }));

            let hasDuplicate = this.pratoDatabase.duplicateCheckStrategy.checkDuplicates(recipe);

            if (hasDuplicate) error = 'Ingredientes inválidos!';

            if (req?.file?.filename) {
                let oldImg = await this.pratoDatabase.get(req.params.id);
                pratoData['ID_Img'] = await this.imageController.update(oldImg.ID_Img, "Pratos", req.file.filename);
            }

            if (error != null) {
                req.error = error;
                return this.get(req, res);
            }

            await this.pratoDatabase.update(req.params.id, pratoData);
            await this.pratoXingrediente.removeByPlate(req.params.id);

            for(const element of recipe) {
                let pratoXing = {
                    ID_Prato: req.params.id,
                    ID_Ingrediente: element.ID_Ingrediente,
                    Porcao: element.Porcao,
                    Tipo_Porcao: element.Tipo_Porcao
                };

                await this.pratoXingrediente.create(pratoXing);
            };

            return res.redirect('http://localhost:3000/pratos/');
        } catch (error) {
            return res.status(404).send(error.stack);
        }
    }

    async remove(req, res) {
        try {
            await this.pratoXingrediente.removeByPlate(req.params.id)
            await this.pratoDatabase.remove(req.params.id);

            return res.redirect('http://localhost:3000/pratos/');
        } catch (error) {
            return res.status(400).send(error.stack);
        }
    }
}

module.exports = new PratoController();
