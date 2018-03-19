const Project = require('../models/Project.js')

module.exports = {
    index: (req, res) => {
        Project.find({}, (err, allDemProjects) => {
            res.render('projects/index',{projects: allDemProjects})
        })
    },
    show: (req, res) => {
        Project.findById(req.params.id).populate('user').exec((err, thatProject) => {

            res.render('projects/show', {project: thatProject})

        })
    },
    create: (req, res) => {
        Project.create(req.body, (err, brandNewProject) => {
            res.redirect('/projects')
        })
    },
    new: (req, res)=>{
        res.render('projects/new')
    },
    update: (req, res) => {
        Project.findByIdAndUpdate(req.params.id, req.body, (err, updatedProject) => {
            res.redirect(`/projects/${req.params.id}`)
        })
    },
    edit: (req, res) => {
       Project.findById(req.params.id, (err, thatProject) => {
           res.render('projects/edit', { project: thatProject})
       }) 
    },
    destroy: (req, res) => {
        Project.findByIdAndRemove(req.params.id, (err, deletedProject) => {
            res.redirect('/projects')
        })
    }
}