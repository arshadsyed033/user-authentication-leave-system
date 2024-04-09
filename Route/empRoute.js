const express = require('express');
const router = express.Router();
const empController = require('../Controller/empController');

// Routes
// router.post('/employeeSignUp', empController.createEmployee);
router.get('/employees', empController.getEmployees);
router.get('/employees/:id', empController.getEmployeeById);
router.put('/employees/:id', empController.updateEmployee);
router.delete('/employees/:id', empController.deleteEmployee);

module.exports = router;
