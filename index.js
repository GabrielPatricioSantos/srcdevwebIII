const express    = require('express')
const bodyParser = require('body-parser')
const routes     = require('./routes')

const app = express()
app.use('/IMG', express.static('IMG'))
app.use('/views/CSS', express.static('views/CSS'))
app.use('/views/JS', express.static('views/JS'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(routes)
app.set('view engine', 'ejs')

app.listen(3000)