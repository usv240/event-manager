require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Session & Flash setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecretkey',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// Flash and user in locals
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.session.user || null;
  next();
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const eventRoutes = require('./routes/eventRoutes');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes'); // <-- Added

app.use('/', mainRoutes);
app.use('/events', eventRoutes);
app.use('/users', userRoutes); // <-- Added

// 404 - Not Found
app.use((req, res) => {
  res.status(404).render('error', { message: "Page Not Found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'CastError') {
    return res.status(400).render('error', { message: "Invalid Event ID format" });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).render('error', { message: "Validation failed. Please check your input fields." });
  }

  res.status(500).render('error', { message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
