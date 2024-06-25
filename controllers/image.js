const fs = require('fs')
const Image = require('../models/Imagem')

const add = async (folder, newFileName) => {
    let imagem

    await Image.create({ Nome: newFileName })
    .then((newImage) => {
        imagem = newImage
    }).catch((err) => {
        imagem.ID = null
    });

    return imagem.ID
}

const get = async (ID) => {
    return await Image.findOne({ where: { ID: ID } })
}

const update = async (ID_img, folder, newFileName) => {
    let imagem = await Image.findOne({ where: { ID: ID_img } })

    if(imagem != null) {
        fs.unlinkSync(`../src/IMG/${folder}/${imagem.Nome}`)
        Image.destroy({ where: { ID: imagem.ID } })
    }

    await Image.create({ Nome: newFileName })
    .then((newImage) => {
        imagem = newImage
    }).catch((err) => {
        return null
    });

    return imagem.ID
}

module.exports = {
    add,
    get,
    update
}