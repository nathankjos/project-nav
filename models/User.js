const
  mongoose = require('mongoose'),
  findOrCreate = require('mongoose-find-or-create')
  bcrypt = require('bcrypt-nodejs'),
  userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    username: String,
    picture: {type: String, default: "/images/CompassRose.svg"}
  })

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}
userSchema.plugin(findOrCreate)

// before re-saving a user, check if password was changed.
// if so, encrypt the new password before saving.
userSchema.pre('save', function(next) {
  if(this.isModified('password')) {
    this.password = this.generateHash(this.password)
  }
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User