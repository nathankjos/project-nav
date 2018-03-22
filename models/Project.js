const mongoose = require('mongoose'),
    commentSchema = new mongoose.Schema({
        user: String,
        body: String,
    }, {timestamps: true}),
    projectSchema = new mongoose.Schema({
        name: {type: String, required: true},
        githubUrl: String,
        description: String,
        imageUrl: {type: String, default: "/images/CompassRose.svg"},
        projectUrl: String,
        comments: [commentSchema],
        currentProject: {type: Boolean, default: true},
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

projectSchema.pre('save', function(next) {
    if(!this.imageUrl) this.imageUrl = "/images/paper-boat.png"
    next()
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project