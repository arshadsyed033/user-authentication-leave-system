const mongoose = require('mongoose')

const leaveRequestSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    role: {
      type: String,
      enum: ['employee']
    },
    reason: {
      type: String,
      required: true
    },
    leaveStatus: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    }
  },
  { timestamps: true }
)
const LeaveRequest = mongoose.model('leaveModel', leaveRequestSchema)
module.exports = LeaveRequest
