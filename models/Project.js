const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    githubUrl: String,
    description: String,
    imageUrl: String,
    projectUrl: String,
    currentProject: {type: Boolean, default: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'} 
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project 