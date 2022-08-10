const express = require("express")
const app = express()
const router = require('./router.js')

//letting express get value from html form (req.body => name = )
app.use(express.urlencoded({extended:false}))
//allow express access async input
app.use(express.json())

app.use(express.static('public'))
//first arg views config, second arg is the folder name
app.set('views', 'views')
//which views engine
app.set('view engine', 'ejs')

app.use('/', router)
// app.listen(3000)
// just export to db.js
module.exports = app