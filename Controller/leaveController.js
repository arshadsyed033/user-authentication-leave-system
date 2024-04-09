const LeaveRequest = require('../Model/leaveModel')
const express = require('express')
const createLeaveRequest = async (req, res) => {
  console.log(req.body)
  try {
    const leaveRequest = new LeaveRequest(req.body)
    const leaveResponse = await leaveRequest.save()
    return res.status(200).send(leaveResponse)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const displayLeaveRequest = async (req, res) => {
  console.log(req.body)
  try {
    const leaveRequests = await LeaveRequest.find()
    console.log(leaveRequests)
    return res.status(200).json(leaveRequests)
  } catch (error) {
    return res.status(400).send(error)
  }
}

const acceptLeaveRequest = async (req, res) => {
  try {
    const leaveRequestId = req.params.leaveRequestId
    const leaveRequest = await LeaveRequest.findByIdAndUpdate(
      leaveRequestId,
      { leaveStatus: 'accepted' },
      { new: true }
    )
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' })
    }
    res.json({
      message: 'Leave request accepted successfully',
      data: leaveRequest
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
}
const rejectLeaveRequest = async (req, res) => {
  try {
    const leaveRequestId = req.params.leaveRequestId
    const leaveRequest = await LeaveRequest.findByIdAndUpdate(
      leaveRequestId,
      { leaveStatus: 'rejected' },
      { new: true }
    )
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' })
    }
    res.json({ message: 'Leave request rejected', data: leaveRequest })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
}

const deleteLeaveRequest = async (req, res) => {
  try {
    const leaveRequestId = req.params.leaveRequestId
    const leaveRequest = await LeaveRequest.findByIdAndDelete(leaveRequestId)
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' })
    }
    res.json({ message: 'Leave request deleted successfully' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
}

const displayAllStatus = async (req, res) => {
  try {
    const statusDisplay = await StatusUpdate.find()
    console.log(statusDisplay)
    res.status(200).json(statusDisplay)
  } catch (error) {
    res.status(400).send(error)
  }
}
module.exports = {
  acceptLeaveRequest,
  rejectLeaveRequest,
  createLeaveRequest,
  displayLeaveRequest,
  deleteLeaveRequest,
  displayAllStatus
}
