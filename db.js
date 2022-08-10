//install mongodb npm install mongodb
const {MongoClient} = require('mongodb')

const client = new MongoClient('mongodb+srv://root:root@cluster0.cmcfzql.mongodb.net/nodeApp?retryWrites=true&w=majority')

//don't know how long it will take for "client"
async function start() {
    await client.connect()
    // after connection => client.db()
    // module.export make database avaialbe from other files
    module.exports = client.db()
    const app = require("./app")
    app.listen(3000)
}

start()