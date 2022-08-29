const express = require("express")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const flash = require("connect-flash")
const app = express()

let sessionOptions = session({
    secret: "testing", 
    store: MongoStore.create({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})

app.use(sessionOptions)
app.use(flash())

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