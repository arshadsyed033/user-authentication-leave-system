const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    userPassword: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['manager'],
      required: true
    }
  },
  { timestamps: true }
)
const User = mongoose.model('userModel', userSchema)
module.exports = User
