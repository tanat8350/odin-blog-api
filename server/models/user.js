const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, minLength: 1, maxLength: 100, required: true },
  password: { type: String, minLength: 1, maxLength: 100, required: true },
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
