const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const empRoute = require('./Route/empRoute')
const leaveRoute = require('./Route/leaveRoute')
const userRoute = require('./Route/userRoute')
const authRoute = require('./Route/authRoute')
const config = require('./Config/config')
const authMiddleware = require('./Middleware/authMiddleware')
const leaveController = require('./Controller/leaveController')
const empController = require('./Controller/empController')
const { refreshToken } = require('./Controller/authController')
const dotenv = require('dotenv').config()
const app = express()
const PORT = 8000
const cookieParser = require('cookie-parser')
const multer = require('multer')
app.use(cookieParser())
app.use(bodyParser.json())
// Routes
app.use('/emp', empRoute)
app.use('/leave', leaveRoute)
app.use('/usr', userRoute)
app.use('/login', authRoute)
app.use('/profile', express.static('upload/images'))
app.post(
  '/create-leave-request',
  authMiddleware.authenticateToken,
  leaveController.createLeaveRequest
)
app.get(
  '/display-leave-request',
  authMiddleware.authenticateToken,
  leaveController.displayLeaveRequest
)
app.post(
  '/empSignUP',
  empController.upload.single('profile'),
  empController.createEmployee
)
app.put(
  '/accept-leave/:leaveRequestId',
  authMiddleware.authenticateToken,
  leaveController.acceptLeaveRequest
)
app.put(
  '/reject-leave/:leaveRequestId',
  authMiddleware.authenticateToken,
  leaveController.rejectLeaveRequest
)
app.delete(
  '/delete-leave/:leaveRequestId',
  authMiddleware.authenticateToken,
  leaveController.deleteLeaveRequest
)
mongoose.connect('mongodb://0.0.0.0:27017/trail', { useNewUrlParser: true })
app.listen(PORT, () => {
  console.log(`Server is running `)
})
