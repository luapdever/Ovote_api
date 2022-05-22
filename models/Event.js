const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  event_name: {
    type: String,
    required: true,
    min: 20,
  },
  event_description: {
    type: String,
    required: true,
    min: 20,
  },
  url_img: {
    type: String,
  },
  creator: { type: String, required: true },
  candidates: { type: Array, default: [] },
  participants: { type: Array, default: [] },
  // candidates: { type: Array, default: [], required: true },
  // participants: { type: Array, default: [], required: true },
  onLive: {
    type: Boolean,
    default: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', EventSchema);
