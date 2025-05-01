const { body } = require('express-validator');

module.exports = [
  body('title')
    .trim()
    .escape()
    .notEmpty().withMessage('Title is required'),

  body('category')
    .trim()
    .escape()
    .notEmpty().withMessage('Category is required'),

  body('location')
    .trim()
    .escape()
    .notEmpty().withMessage('Location is required'),

  body('details')
    .trim()
    .escape()
    .notEmpty().withMessage('Details are required'),

  body('start')
    .notEmpty().withMessage('Start date is required')
    .custom((value) => {
      const start = new Date(value);
      if (isNaN(start)) throw new Error('Invalid start date');
      if (start < new Date()) throw new Error('Start date must be in the future');
      return true;
    }),

  body('end')
    .notEmpty().withMessage('End date is required')
    .custom((value, { req }) => {
      const end = new Date(value);
      const start = new Date(req.body.start);
      if (isNaN(end)) throw new Error('Invalid end date');
      if (end <= start) throw new Error('End date must be after start date');
      return true;
    }),
];
