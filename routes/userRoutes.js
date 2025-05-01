const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const isGuest = require('../middleware/isGuest');
const isLoggedIn = require('../middleware/isLoggedIn');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Login Rate Limiter
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 5,              // limit each IP to 5 requests per minute
  message: "Too many login attempts. Please try again shortly.",
  statusCode: 429
});

// Signup
router.get('/signup', isGuest, userController.renderSignupForm);
router.post(
  '/signup',
  isGuest,
  [
    body('firstName').trim().escape().notEmpty().withMessage('First name is required'),
    body('lastName').trim().escape().notEmpty().withMessage('Last name is required'),
    body('email').trim().escape().normalizeEmail().isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  userController.createUser
);

// Login
router.get('/login', isGuest, userController.renderLoginForm);
router.post(
  '/login',
  isGuest,
  loginLimiter,
  [
    body('email').trim().escape().normalizeEmail().isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  userController.loginUser
);

// Logout
router.get('/logout', isLoggedIn, userController.logoutUser);

// Profile
router.get('/profile', isLoggedIn, userController.showProfile);

module.exports = router;
