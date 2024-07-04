const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controller/signUp');
const loginController = require('../controller/login');
const listUserController = require('../controller/listUser');
const trackAPi = require('../controller/userTrack');

// creating user api
router.post('/add/user', userController.createUser);

// sign in user api
router.post('/admin/login', loginController.loginUser);

// user list api
router.get('/admin/getAllUser', auth, listUserController.getAllUsers);

// Route for following a user
router.post('/admin/follow', auth, trackAPi.followUser);

// Route for unfollowing a user
router.post('/admin/unfollow', auth, trackAPi.unfollowUser);

//show followed users
router.get('/admin/get/follow', auth, trackAPi.getFollowedUsers);

//show unfollowed users
router.get('/admin/get/unfollow', auth, trackAPi.getUnfollowedUsers);

router.get("/", (req, res) => {
    res.send("App is running..");
});

module.exports = router;
