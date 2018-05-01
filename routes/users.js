const express = require('express');
const router = express.Router();

// load user controller
const usersController = require('../controllers/usersController');

// User registration roue
router.get('/register', usersController.getRegistration);

// User login route
router.get('/login', usersController.getLogin);

// Login form post
router.post('/login', usersController.postLogin);

// User registration form
router.post('/register', usersController.postRegister);

// logout user
router.get('/logout', usersController.logoutUser);

module.exports = router;
