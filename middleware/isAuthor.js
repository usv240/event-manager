const Event = require('../models/event');

module.exports = async function (req, res, next) {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      req.flash('error', 'Event not found.');
      return res.redirect('/');
    }

    // ✅ Proper ObjectId comparison
    if (!event.host.equals(req.session.user._id)) {
      req.flash('error', 'You are not authorized to do that.');
      return res.status(403).render('error', { message: 'Unauthorized access (403)' });
    }

    next();
  } catch (err) {
    console.error('isAuthor middleware error:', err);
    req.flash('error', 'Something went wrong.');
    res.redirect('/');
  }
};
