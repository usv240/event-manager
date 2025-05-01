const { body } = require('express-validator');

module.exports = [
  body('status')
    .trim()
    .escape()
    .isIn(['YES', 'NO', 'MAYBE'])
    .withMessage('Invalid RSVP status'),
];
