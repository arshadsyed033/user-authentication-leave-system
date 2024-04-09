const express   =   require('express')
const router = express.Router();
const leaveController = require('../Controller/leaveController');
const { authenticateToken } = require('../Middleware/authMiddleware');
router.get('/leaveRequests', authenticateToken, leaveController.displayLeaveRequest);
module.exports=router;