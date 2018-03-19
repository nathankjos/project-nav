const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    url: String,
    description: String,
    imageUrl: String 
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project 