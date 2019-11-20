const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async(req, res) => {

    res.render('home')
})

app.listen(port, (err) => {
    if(err) {
        console.log("Servidor do curriculo online não pode ser iniciado!")
    }
})