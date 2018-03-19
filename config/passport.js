const
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User.js')
    GitHubStrategy = require('passport-github2').Strategy,
    require('dotenv').load()
    

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
},
function(accessToken, refreshToken, profile, cb){
User.findOrCreate({username: profile.username}, {username: profile.username}, (err, user) => {
// console.log(user)
// console.log(profile)
user.name = profile.username
user.picture = profile.photos[0].value
console.log(user)
user.save((err, newUser) =>{
    return cb (err, user)   
})

})
//    console.log(profile)
}))

passport.serializeUser((user, done)=> {
    done(null, user._id)

})

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, thatUser)=>{
        done(err, thatUser)
    })
})

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email }, (err, user)=>{
        if(err) return done(err)
        if(user)return done(null, false, req.flash('signupMessage', "email already in use"))
        
if(!req.body.name || !req.body.password)return done(null, false, req.flash ('signupMessage', "All fields are required..."))
        var newUser = new User()
        newUser.name = req.body.name
        newUser.email = req.body.email
        newUser.password = newUser.generateHash(req.body.password)
        newUser.save((err, savedUser)=>{
            return done(null, newUser)
        })
    
    })
}))

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done)=>{
    console.log(req.body)
    User.findOne({ email: email }, (err, user)=>{
        if(err) return done (err)
        if(!user) return done (null, false, req.flash('loginMessage', "Invalid credentials"))
        if(!user.validPassword(req.body.password)) return done(null, false, req.flash('loginMessage', "Invalid credential") )
        if(!req.body.email || !req.body.password)return done(null, false, req.flash ('loginMessage', "All fields are required..."))
        return done(null, user)
    })
}))

module.exports = passport