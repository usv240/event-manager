const mongoose = require('mongoose');

module.exports = function (req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).render('error', { message: 'Invalid Event ID format (400 Bad Request)' });
  }

  next();
};
