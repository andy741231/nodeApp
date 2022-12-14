const User = require('../models/User')

exports.mustBeLoggedIn = function (req, res, next) {
    if(req.session.user){
        next()
    }else{
        req.flash("errors", "Please log in!")
        req.session.save(function(){
            res.redirect('/')
        })
    }
}

exports.login = function(req, res){
    let user = new User(req.body)
    // use callback function to wait for login()
    // traditional callback
    user.login().then(function(result) {
        req.session.user = {username: user.input.username}
        req.session.save(function(){
            res.redirect("/")
        })
    }).catch(function(e) {
        // without flash package: req.session.flash.errors = [e]
        req.flash('errors', e)
        req.session.save(function(){
            res.redirect("/")
        })
    })

}

exports.logout = function(req, res){
    req.session.destroy(function(){
        res.redirect("/")
    })
}

exports.register = function(req, res){
    //create new object based on User object as blue print
    let user = new User(req.body)
    user.register().then(()=>{
        req.session.user = {username: user.input.username}
        req.session.save(function(){
            res.redirect('/')
        })
    }).catch((regErrors) => {
        regErrors.forEach(function(error){
            req.flash('regErrors', error)
        })
        req.session.save(function(){
            res.redirect('/')
        })
    })
}


exports.home = function(req, res){
    if(req.session.user) {
        res.render("register")
    } else {
        res.render('home-guest', {errors: req.flash('errors'), regErrors: req.flash('regErrors')})
    }
}