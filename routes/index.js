var express     =   require('express')      ,
    router      =   express.Router()        ,
    passport    =   require('passport')     ,
    
    models      =   require("../models")    ,
    User        =   models.User             ,
    
    middleware  =   require('../middleware')
    
    
    
router.get('/', function(req, res){
    res.render("home")
})

router.get('/login', function(req, res){
    res.render("login")
})

router.post('/login', passport.authenticate("local", {
    successRedirect : '/secret',
    failureRedirect : '/login'
}), function(req, res){
    
})

router.get('/register', function(req, res){
    res.render("register")
})

router.post('/register', function(req, res){
    
    var newUser = new User({
        name    :   req.body.name,
        username:   req.body.username
    })
    
    User.register(newUser, req.body.password, function(error, registeredUser){
        if(error){
            req.flash("error", "There was problem in registering you. Try with a different username")
            res.redirect('/register')
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Your are successfully registered")
                res.redirect('/secret')
            })
        }
    })
    
})

router.get('/logout', function(req, res){
    req.logout()
    req.flash("success", "Your are Logged Out")
    res.redirect('/')
})

router.get('/secret', middleware.isLoggedIn, function(req, res){
    res.render("secret")
})

module.exports = router