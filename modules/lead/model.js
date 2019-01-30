const mongoose = require('mongoose');
const moment = require('moment');
const schema = require('./schema');

module.exports = mongoose.model('Lead', schema);