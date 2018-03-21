const Project = require('../models/Project.js')

module.exports = 

{
    index: (req, res) => {
        if(req.query.search){
       const regex = new RegExp(escapeRegex(req.query.search), 'gi');

    Project.find({name: regex}, (err, allDemProjects) => {
        res.render('projects/index',{projects: allDemProjects, currentUser: req.user})
    })
        } else {
        Project.find({}, (err, allDemProjects) => {
            res.render('projects/index',{projects: allDemProjects})
        })
    }
function escapeRegex(text){
        return text.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" );
    }
    },
    show: (req, res) => {
        Project.findById(req.params.id).populate('user').exec((err, thatProject) => {
            res.render('projects/show', {project: thatProject})
        })
    },
    post: (req, res) => {
        var newProject = new Project(req.body)
        newProject.user = req.user._id
        newProject.save((err, brandNewProject) => {
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
    },

}