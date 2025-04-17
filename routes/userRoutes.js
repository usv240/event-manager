const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const isGuest = require('../middleware/isGuest');
const isLoggedIn = require('../middleware/isLoggedIn');

const router = express.Router();

// Signup
router.get('/signup', isGuest, userController.renderSignupForm);
router.post(
  '/signup',
  isGuest,
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  userController.createUser
);

// Login
router.get('/login', isGuest, userController.renderLoginForm);
router.post('/login', isGuest, userController.loginUser);

// Logout
router.get('/logout', isLoggedIn, userController.logoutUser);

// Profile
router.get('/profile', isLoggedIn, userController.showProfile);

module.exports = router;
