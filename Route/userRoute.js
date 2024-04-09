const express = require ('express')
const router = express.Router();
const userController = require('../Controller/userController')

router.post('/user', userController.createUser);
router.get('/users',userController.getUsers);
router.get('/userbyid/:id', userController.getUserById);
router.put('/users/:id', userController.updateUserById);
router.put('/userdelete/:id', userController.deleteUserById)
module.exports = router;