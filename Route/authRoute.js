const express = require("express");
const authController = require("../Controller/authController");
const router = express.Router();

router.post('/employeeLogin', authController.loginEmp);
// router.post('/refreshToken', authController.refreshToken)
router.post('/userLogin', authController.loginUser);
module.exports = router;