const express = require("express")
const app = express()

app.set("view engine", "ejs")
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/pergunta", (req, res) => {
    res.render("pergunta")
})

app.post("/perguntar", (req, res) => {
    res.send("Ok")
})

app.listen(8000, () => {
    console.log("Server ON!")
})