const postsCollection = require('../db').db().collection("posts")
const ObjectID = require('mongodb').ObjectId
let Post = function(data, userid) {
    this.input = data
    this.errors = []
    this.userid = userid
}

Post.prototype.cleanUp = function(){
    //type of value
    if(typeof(this.input.title) != "string"){
        this.input.title = ""
    }
    if(typeof(this.input.body) != "string"){
        this.input.body = ""
    }

    this.input = {
        title: this.input.title.trim(),
        body: this.input.body.trim(),
        createDate: new Date(),
        author: ObjectID(this.userid)
    }
}

Post.prototype.validate = function(){
    if(this.input.title == "") {
        this.errors.push("Title cannot be empty")
    }

    if(this.input.body == "") {
        this.errors.push("Body cannot be empty")
    }
}

Post.prototype.create = function(){
    return new Promise ((resolve, reject) => {
        this.cleanUp()
        // this.validate()
        if (!this.errors.length) {
            postsCollection.insertOne(this.input).then(() =>{
                resolve()
            }).catch(() => {
                this.errors.push('Connection Errors')
                reject(this.errors)
            })
            
        } else {
            reject(this.errors)
        }
    })
}

Post.findSingleById = function(id) {
    return new Promise( async function(resolve, reject){
        if (typeof(id) != "string" || !ObjectID.isValid(id)) {
            reject()
            return
        } 
        
        let posts = await postsCollection.aggregate([
            {$match: { _id: new ObjectID(id)}},
            {$lookup: { from: "users", localField: "author", foreignField: "_id", as: "authorDocument"}}
        ]).toArray()

        if(posts.length) {
            resolve(posts[0])
        } else {
            reject()
        }
    })
}
module.exports = Post