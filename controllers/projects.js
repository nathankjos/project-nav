const Project = require('../models/Project.js')

module.exports = 
{
    index: (req, res) => {
        Project.find({}, (err, allDemProjects) => {
            console.log("hello")
            res.json('projects/index',{projects: allDemProjects})
        })
    },
    show: (req, res) => {
        Project.findById(req.params.id).populate('user').exec((err, thatProject) => {
            res.json('projects/show', {project: thatProject})
        })
    }
}