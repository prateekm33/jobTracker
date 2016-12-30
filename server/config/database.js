const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mongoURI = 'mongodb://localhost/jobTracker';

mongoose.connect(mongoURI);
const db = mongoose.connection;

module.exports.db = db;

