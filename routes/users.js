

const
  express = require('express'),
  usersRouter = new express.Router(),
  passport = require('passport'),
  Project = require('../models/Project.js')

usersRouter.get('/login', (req, res) => {
  res.render('login', {message: req.flash('loginMessage')})
})

usersRouter.post('/login', passport.authenticate('local-login', {
  successRedirect: '/users/profile',
  failureRedirect: '/users/login'
}))

usersRouter.get('/signup', (req, res) => {
  res.render('signup', {message: req.flash('signupMessage')})
})

usersRouter.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/users/profile', 
  failureRedirect: '/users/signup'
}))

usersRouter.get('/profile', isLoggedIn ,(req, res)=>{
  // if(currentUser === username)
  // axios.get(currentUser.public_repos)
  // if current user has a username field:
  //send axios call to github with currentUsers name retrieve public repos
  Project.find({}, (err, projects) => {
    res.render('profile', { user: req.user, project: projects }) //current user
  })
})

usersRouter.get('/profile/edit', isLoggedIn, (req,res)=>{
  res.render('edit')
})

usersRouter.patch('/profile', isLoggedIn, (req, res) => {
  if(!req.body.password) delete req.body.password
  Object.assign(req.user, req.body)
  req.user.save((err, updatedUser) => {
    res.redirect('/users/profile')
  })
})


usersRouter.get('/logout', (req, res)=>{
  req.logout()
  res.redirect('/')
})

// link to chat
usersRouter.get('/chat', (req, res)=>{
  res.render('chat')
})

usersRouter.get('/auth/github/', passport.authenticate('github'))

usersRouter.get('/auth/github/callback', passport.authenticate('github'),(req, res)=>{
  res.redirect('/users/profile')
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect('/users/login');
}

module.exports = usersRouter