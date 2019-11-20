const express = require('express')
const sqlite = require('sqlite')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000
const dbConnection = sqlite.open(path.resolve(__dirname, 'curriculo.sqlite'), { Promise })

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async(req, res) => {
    const db = await dbConnection
    const user = await db.get('select * from users;')
    const dados = await db.get('select * from dados;')
    const academics = await db.all('select * from f_academics ORDER BY inicio DESC;')

    res.render('home', {
        user,
        dados,
        academics
    })
})

app.get('/admin', (req, res) => {
    res.render('admin/home')
})

const init = async() => {
    const db = await dbConnection
    const nome = 'Moacyr Simplicio Santana Junior'
    const resume = `Possui graduação em Ciência da Computação pela Universidade Salvador (2014).
                    Atualmente é professor - Secretaria de Educação do Estado da Bahia.
                    Profissional que visa antecipar futuros problemas, necessidades ou mudanças.`
    await db.run(`create table if not exists users(id INTEGER PRIMARY KEY, name TEXT, resume TEXT, data_modify TEXT);`)
    await db.run(`insert into users(name, resume) values('${nome}', '${resume}')`)
    await db.run(`create table if not exists dados(id INTEGER PRIMARY KEY, pai TEXT, mae TEXT, data_nasc TEXT, rg INTEGER, cpf INTEGER, email TEXT);`)
    await db.run(`insert into dados(pai, mae, data_nasc, rg, cpf, email) values('Moacyr Simplicio Santana', 'Ana Zobeilda Vilas Boas Santana', '22/07/1982', 1148427953, 00449376524, 'junior.vilasboas@gmail.com')`)
    await db.run(`create table if not exists f_academics(id INTEGER PRIMARY KEY, descricao TEXT, instituicao TEXT, inicio INTEGER, fim INTEGER);`)
    await db.run(`insert into f_academics(descricao, instituicao, inicio, fim) values('Ciência da Computação', 'UNIFACS', 2010, 2014);`)
    await db.run(`insert into f_academics(descricao, instituicao, inicio) values('Bioinformática', 'UEFS', 2017);`)
}

//init()

app.listen(port, (err) => {
    if(err) {
        console.log("Servidor do curriculo online não pode ser iniciado!")
    }
})