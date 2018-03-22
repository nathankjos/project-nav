const Project = require('../models/Project.js')

module.exports = 
{
    index: (req, res) => {
    Project.find({name: regex}, (err, allDemProjects) => {
        res.json('projects/index',{projects: allDemProjects, currentUser: req.user})
    })
        Project.find({}, (err, allDemProjects) => {
            console.log("hello")
            res.render('projects/index',{projects: allDemProjects})
        })
    },
    show: (req, res) => {
        Project.findById(req.params.id).populate('user').exec((err, thatProject) => {
            res.render('projects/show', {project: thatProject})
        })
    }
}