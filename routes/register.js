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

//get unfollowed users
router.get('/admin/get/notFollowing', auth, trackAPi.getNotFollowingUsers);

//get following users
router.get('/admin/get/following', auth, trackAPi.getFollowing);

//get users following me
router.get('/admin/get/followers', auth, trackAPi.getFollowers);

router.get("/", (req, res) => {
    res.send("App is running..");
});

module.exports = router;
