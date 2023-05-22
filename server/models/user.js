const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: 'String', required: true },
  hash: { type: 'String', required: true },
  salt: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateCreated: { type: 'Date', default: Date.now, required: true },
});

module.exports = mongoose.model('User', userSchema);
