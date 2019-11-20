const express = require('express')
const sqlite = require('sqlite')
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, (err) => {
    if(err) {
        console.log("Servidor do curriculo online não pode ser iniciado!")
    }
})