const 
    express = require('express')
    projectsRouter = new express.Router()
    projectsCtrl = require('../controllers/projects.js')

projectsRouter.get('/', projectsCtrl.index)
projectsRouter.post('/', projectsCtrl.post)

projectsRouter.get('/new', projectsCtrl.new)
projectsRouter.get('/:id/edit', projectsCtrl.edit)

projectsRouter.get('/:id', projectsCtrl.show)
projectsRouter.patch('/:id', projectsCtrl.update)
projectsRouter.delete('/:id', projectsCtrl.destroy)

module.exports = projectsRouter