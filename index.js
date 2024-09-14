const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/pergunta")

connection.authenticate()
    .then(() => {
    })
    .catch((Msgerror) => { console.log(Msgerror) })

app.set("view engine", "ejs")

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {

    Pergunta.findAll({
        raw: true, order: [
            ['id', 'ASC']
        ]
    }).then((perguntas) => {
        console.log(perguntas)
        res.render("index", {
            perguntas: perguntas
        })
    })
})

app.get("/pergunta", (req, res) => {
    res.render("pergunta")
})

app.post("/perguntar", (req, res) => {
    var title = req.body.title
    var desc = req.body.desc
    //res.send("Titulo:" + title + "<br>" + "Descrição:" + desc)

    Pergunta.create({
        titulo: title,
        descricao: desc
    }).then(() => {
        res.redirect('/')
    })

})

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id

    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) {
            //CRIAR PÁGINA PARA EXIBIR A PERGUNTA ESPECIFICA
            res.render("perguntar", {
                pergunta: pergunta
            })
        } else {
            res.redirect("/")
        }
    })

})

app.listen(8000, () => {
    console.log("Server ON!")
})