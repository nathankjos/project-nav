const mongoose = require('mongoose'),
    commentSchema = new mongoose.Schema({
        user: String,
        body: String,
    }, {timestamps: true}),
    projectSchema = new mongoose.Schema({
        name: {type: String, required: true},
        githubUrl: String,
        description: String,
        imageUrl: String,
        projectUrl: String,
        comments: [commentSchema],
        currentProject: {type: Boolean, default: true},
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})
const Project = mongoose.model('Project', projectSchema)
module.exports = Project