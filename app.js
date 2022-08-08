const express = require("express")
const app = express()

app.get('/', function(req, res){
    res.send("new app")
})

app.listen(3000)