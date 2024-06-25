const multer = require('multer')
const path   = require('path')
const crypto = require('crypto')

module.exports = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            let destination

            if(req.path.includes('pratos'))
                destination = "Pratos"

            cb(null, '../src/IMG/' + destination)
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err)
                
                const fileName = hash.toString('hex') + path.extname(file.originalname)

                cb(null, fileName)
            })
        }
    }),
    fileFilter: async (req, file, cb) => {
        const allowedExt = [
            'image/jpeg',
            'image/pjpeg',
            'image/png'
        ]

        if(!allowedExt.includes(file.mimetype)) {
            cb(new Error('Invalid file type.'))
            return false
        }

        cb(null, true)
    }
}