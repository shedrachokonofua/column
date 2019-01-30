const mongoose = require('mongoose');
const schema = require('./schema');

module.exports = mongoose.model('Lead', schema);