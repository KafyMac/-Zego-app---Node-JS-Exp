const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controller/userController');
const loginController = require('../controller/login');

// creating user api
router.post('/add/user', userController.createUser);

// sign in user api
router.post('/admin/login', loginController.loginUser);


module.exports = router;
