const { validationResult } = require('express-validator');
const User = require('../models/user');
const Event = require('../models/event');

// Show signup form
exports.renderSignupForm = (req, res) => {
  res.render('user/signup', {
    messages: req.flash()
  });
};

// Handle signup form submission
exports.createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash('error', errors.array().map(e => e.msg).join(', '));
    return res.redirect('/users/signup');
  }

  try {
    const { firstName, lastName, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      req.flash('error', 'Email is already registered.');
      return res.redirect('/users/signup');
    }

    const user = new User({ firstName, lastName, email, password });
    await user.save();

    req.flash('success', 'Signup successful! Please log in.');
    res.redirect('/users/login');
  } catch (err) {
    console.error('Signup error:', err);
    req.flash('error', 'Something went wrong during signup.');
    res.redirect('/users/signup');
  }
};

// Show login form
exports.renderLoginForm = (req, res) => {
  res.render('user/login', {
    messages: req.flash()
  });
};

// Handle login form
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error', 'Invalid email or password.');
      return res.redirect('/users/login');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      req.flash('error', 'Invalid email or password.');
      return res.redirect('/users/login');
    }

    // Save session
    req.session.user = {
      _id: user._id,
      firstName: user.firstName,
      email: user.email
    };

    req.flash('success', `Welcome back, ${user.firstName}!`);
    res.redirect('/');
  } catch (err) {
    console.error('Login error:', err);
    req.flash('error', 'Login failed. Please try again.');
    res.redirect('/users/login');
  }
};

// Logout user
exports.logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) console.error('Logout error:', err);
    res.redirect('/');
  });
};

// Show user profile
exports.showProfile = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const events = await Event.find({ host: userId });

    res.render('user/profile', {
      events,
      messages: req.flash()
    });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).render('error', { message: "Failed to load profile." });
  }
};
