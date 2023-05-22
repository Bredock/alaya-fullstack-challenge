const express = require('express');
const router = express.Router();
const passport    = require('passport');
const UserController = require('../controllers/user.controller')


// Register user
router.route('/users/register').post(UserController.register);

// Login user
router.route('/users/login').post(UserController.login);

module.exports = router;