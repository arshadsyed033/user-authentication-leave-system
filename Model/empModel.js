const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    // unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  role: {
    type : String,
    required : true
  },
  profilePicture:
  {
    type : String
  },
  profilePictureUploadedAt: {
    type: Date
  }
}, { timestamps : true});

const Employee = mongoose.model('empModel', empSchema);

module.exports = Employee;
