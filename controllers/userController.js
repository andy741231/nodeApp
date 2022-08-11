const User = require('../models/User')

exports.login = function(req, res){
    let user = new User(req.body)
    user.login()
}

exports.logout = function(){
    
}

exports.register = function(req, res){
    //create new object based on User object as blue print
    let user = new User(req.body)
    user.register()
    if(user.errors.length) {
     res.send(user.errors)
    }else {
     res.send('yay!')
    }
}

exports.home = function(req, res){
    res.render('home-guest')
}