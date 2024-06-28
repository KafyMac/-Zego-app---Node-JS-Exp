const express = require('express');
const router = express.Router();
const registerRouter = require('./register'); // Correct path to register.js
// Mount the register router
router.use('/', registerRouter);

module.exports = router;
