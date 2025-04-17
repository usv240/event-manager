const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    required: true
  },
  details: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  location: { type: String, default: 'TBD' },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },  
  image: { type: String }
});

module.exports = mongoose.model('Event', eventSchema);
