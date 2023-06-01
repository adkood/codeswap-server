const mongoose = require('mongoose');
const uniqid = require('uniqid');

const codingLanguages = ['C++', 'Java', 'Python', 'JavaScript'];

const mongooseSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  readKey: { type: String, default: uniqid, unique: true },
  writeKey: { type: String, default: uniqid, unique: true },
  value: { type: String,default:"" },
  language: {
    type: String,
    enum: codingLanguages,
    default: 'C++',
  },
});

const Room = mongoose.model('Room', mongooseSchema);

module.exports = Room;
