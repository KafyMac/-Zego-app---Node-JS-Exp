const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controller/userController');
const loginController = require('../controller/login');
const listUserController = require('../controller/listUser');

// creating user api
router.post('/add/user', userController.createUser);

// sign in user api
router.post('/admin/login', loginController.loginUser);

// user list api
router.get('/admin/getAllUser', listUserController.getAllUsers);

router.get("/", (req, res) => {
    res.send("App is running..");
});

module.exports = router;
