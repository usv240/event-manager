const Rsvp = require('../models/rsvp');
const Event = require('../models/event');

const createOrUpdate = async (req, res, next) => {
  const eventId = req.params.id;
  const userId = req.session.user;
  const { status } = req.body;

  try {
    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).render('error', { message: 'Event not found (404)' });
    }

    let rsvp = await Rsvp.findOne({ event: eventId, user: userId });
    if (rsvp) {
      rsvp.status = status;
      await rsvp.save();
    } else {
      rsvp = new Rsvp({ user: userId, event: eventId, status });
      await rsvp.save();
    }

    req.flash('success', `RSVP status updated to ${status}`);
    res.redirect('/users/profile');
  } catch (err) {
    console.error('RSVP error:', err);
    res.status(500).render('error', { message: 'Failed to process RSVP request' });
  }
};

module.exports = { createOrUpdate };
