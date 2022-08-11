const usersCollection = require('../db').collection("users")
const validator = require('validator')

//reusable constructor function
let User = function(data){
    this.input = data
    this.errors = []
}

User.prototype.cleanUp = function() {
    //type of value
    if(typeof(this.input.username) != "string"){
        this.input.username = ""
    }
    if(typeof(this.input.email) != "string"){
        this.input.username = ""
    }
    if(typeof(this.input.password) != "string"){
        this.input.username = ""
    }

    //get rid of questionable properties, limit "data" to only these properties
    this.input = {
        //trim() will trim space in a value
        username: this.input.username.trim().toLowerCase(),
        email: this.input.email.trim().toLowerCase(),
        password: this.input.password
    }
}

// prototype method gives access instead of duplicate it for each object
User.prototype.validate = function() {
    if(this.input.username == ""){
        this.errors.push("User name cannot be empty")
    }
    if(this.input.email == ""){
        this.errors.push("Email cannot be empty")
    }
    if(this.input.password == ""){
        this.errors.push("Password cannot be empty")
    }
    if(this.input.password.length > 0 && this.input.password.length < 6){
        this.errors.push("Password needs to be more than 12 characters")
    }

    //npm install validator
    if(!validator.isEmail(this.input.email)){
        this.errors.push("Email is not valid")
    }
    if(this.input.username != "" && !validator.isAlphanumeric(this.input.username)){
        this.errors.push("Username should only be alphabets and numbers")
    }
}

User.prototype.login = function() {
    // this.cleanUp()
    usersCollection.findOne({username: this.input.username}, (err, attemptedUser) => {
        if(attemptedUser && attemptedUser.password == this.input.password){
            console.log("logged in")
            console.log(attemptedUser)
        }else{
            console.log("logged out")
        }
    })
}

User.prototype.register = function() {
    //validate user data
    this.cleanUp()
    this.validate()
    // no error save data
    if(!this.errors.length) {
        usersCollection.insertOne(this.input)
    }
}

module.exports = User