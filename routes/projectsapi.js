const 
    express = require('express')
    projectsapiRouter = new express.Router()
    projectsapiCtrl = require('../controllers/projectsapi.js')

projectsRouter.get('/', projectsCtrl.index)

projectsRouter.get('/:id', projectsCtrl.show)

module.exports = projectsRouter