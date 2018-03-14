const
    mongoose = require('mongoose'),
    userSchema = new mongoose.Schema({
        name: String,
        projectNum: Number,
        contact: String,
        profilePic: String
    }),
    User = mongoose.model('User', userSchema)
module.exports = User