//install mongodb npm install mongodb
const {MongoClient} = require('mongodb')

//npm install dotenv
const dotenv = require("dotenv")
dotenv.config()
const client = new MongoClient(process.env.CONNECTIONSTRING)

//don't know how long it will take for "client"
async function start() {
    await client.connect()
    // after connection => client.db()
    // module.export make database avaialbe from other files
    module.exports = client
    const app = require("./app")
    app.listen(process.env.PORT)
}

start()