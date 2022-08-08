const express = require("express")
const app = express()
const router = require('./router.js')
console.log(router)
app.use(express.static('public'))
//first arg views config, second arg is the folder name
app.set('views', 'views')
//which views engine
app.set('view engine', 'ejs')

app.use('/', router)
app.listen(3000)