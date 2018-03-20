const
  express = require('express'),
  usersRouter = new express.Router(),
  passport = require('passport')

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
  res.render('profile', { user: req.user }) //current user
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
  res.render('profile', { user: req.user }) 
})



function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect('/users/login');
}



module.exports = usersRouter