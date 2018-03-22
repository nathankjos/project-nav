const 
    express = require('express')
    projectsapiRouter = new express.Router()
    projectsapiCtrl = require('../controllers/projectsapi.js')

projectsapiRouter.get('/api/projects', projectsapiCtrl.index)
projectsapiRouter.get('/api/projects/:id', projectsapiCtrl.show)

module.exports = projectsapiRouter