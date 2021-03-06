const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  jobs: { type: [ {
    company: String,
    role: String,
    status: String,
    contact: String,
    date_applied: { type: Date, default: Date.now }
  } ], default: [] }
});

const User = mongoose.model('User', userSchema);
module.exports = {
  User
}