const Project = require('../models/Project.js')
const Comment = require('../models/Project.js')

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
            console.log("hello")
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
        // Project.create(req.body, (err, project) => {
        //     console.log("this is hte new project", project)
        //     res.redirect('/projects')
        // })
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
    },
    destroyComment: (req,res) => {
            Project.findById(req.params.projectId, (err, thatProject)=> {
                if(err) return console.log(err)
                console.log(thatProject)
                thatProject.comments.remove(req.params.id)
                console.log(thatProject)
                // var t  = thatProject.comments.find((c) => c._id.equals(req.params.id))
                // console.log(t)
                thatProject.save((err)=> {
                    res.redirect(`/projects/${thatProject._id}`)
                })
            })
    }
}