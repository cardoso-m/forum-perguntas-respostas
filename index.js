const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/pergunta")

connection.authenticate()
    .then(() => {
    })
    .catch((Msgerror) => {
        console.log(Msgerror)
    })

app.set("view engine", "ejs")

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.render("index")
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

app.listen(8000, () => {
    console.log("Server ON!")
})