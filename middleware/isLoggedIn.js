module.exports = function (req, res, next) {
    if (!req.session.user) {
      req.flash('error', 'You must be logged in.');
      return res.redirect('/users/login');
    }
    next();
  };
  