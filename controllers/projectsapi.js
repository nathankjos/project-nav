const Project = require('../models/Project.js')

module.exports = 
{
    index: (req, res) => {
        Project.find({}, (err, allDemProjects) => {
            res.json(allDemProjects)
        })
    },
    show: (req, res) => {
        Project.findById(req.params.id).populate('user').exec((err, thatProject) => {
            res.json(thatProject)
        })
    }
}