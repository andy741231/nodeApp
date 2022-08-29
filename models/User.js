// npm install bcryptjs
const bcrypt = require("bcryptjs")
const usersCollection = require('../db').db().collection("users")
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
        this.input.email = ""
    }
    if(typeof(this.input.password) != "string"){
        this.input.password = ""
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
    // if(this.input.password.length > 0 && this.input.password.length < 6){
    //     this.errors.push("Password needs to be more than 12 characters")
    //}

    //npm install validator
    if(!validator.isEmail(this.input.email)){
        this.errors.push("Email is not valid")
    }
    if(this.input.username != "" && !validator.isAlphanumeric(this.input.username)){
        this.errors.push("Username should only be alphabets and numbers")
    }
}

User.prototype.login = function() {

   return new Promise((resolve, reject) => {
    this.cleanUp()

    usersCollection.findOne({username: this.input.username}).then((attemptedUser) => {
      
            if(attemptedUser && bcrypt.compareSync(this.input.password, attemptedUser.password)){
                resolve("logged in")
            }else{
                reject("Invalid Username or Password")
            }

    }).catch(function() {
        reject("error")
    })

})
}

User.prototype.register = function() {
    //validate user data
    this.cleanUp()
    this.validate()
    // no error save data
    if(!this.errors.length) {
        //hash user password
        let salt = bcrypt.genSaltSync(10)
        this.input.password = bcrypt.hashSync(this.input.password, salt)
        usersCollection.insertOne(this.input)
    }
}

module.exports = User