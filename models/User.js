const
  mongoose = require('mongoose'),
  findOrCreate = require('mongoose-find-or-create')
  bcrypt = require('bcrypt-nodejs'),
  userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    username: String
  })

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}
userSchema.plugin(findOrCreate)

const User = mongoose.model('User', userSchema)
module.exports = User