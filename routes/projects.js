const 
    express = require('express')
    projectsRouter = new express.Router()
    projectsCtrl = require('../controllers/projects.js')

projectsRouter.get('/', projectsCtrl.index)
projectsRouter.post('/', isLoggedIn, projectsCtrl.post)

projectsRouter.get('/new', isLoggedIn, projectsCtrl.new)

projectsRouter.get('/:id', projectsCtrl.show)

projectsRouter.get('/:id/edit', isLoggedIn, projectsCtrl.edit)
projectsRouter.patch('/:id', isLoggedIn, projectsCtrl.update)
projectsRouter.delete('/:id', isLoggedIn, projectsCtrl.destroy)

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();
    res.redirect('/users/login');
}

module.exports = projectsRouter