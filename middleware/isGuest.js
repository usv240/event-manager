module.exports = function (req, res, next) {
    if (req.session.user) {
      req.flash('error', 'You are already logged in.');
      return res.redirect('/users/profile');
    }
    next();
  };
  