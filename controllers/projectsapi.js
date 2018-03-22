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
    },
    post: (req, res) => {
        var newProject = new Project(req.body)
        newProject.user = req.user.id
        newProject.currentProject = Boolean(req.body.currentProject)
        newProject.save((err, brandNewProject) => {
            if(err) return console.log(err)
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
    createComment: (req, res) => {
        console.log("here")
        Project.findById(req.params.id, (err, thatProject) => {
            console.log(req.user.name)
            req.body.user = req.user.name
            console.log("this is the body", req.body)
            thatProject.comments.push(req.body)
            thatProject.save((err, savedProject) => {
                res.redirect(`/projects/${thatProject._id}`)
            })
        })
    }
}