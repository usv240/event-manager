const express = require('express');
const router = express.Router();
const { createOrUpdate } = require('../controllers/rsvpController'); 
const isLoggedIn = require('../middleware/isLoggedIn'); 

const validateRSVP = require('../middleware/validateRSVP');

// RSVP POST route
router.post('/events/:id/rsvp', isLoggedIn, validateRSVP, createOrUpdate);

module.exports = router;
