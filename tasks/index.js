require('dotenv').config()
const database = require('../config/database');
const run = require('./run');

database.connect()
  .then(() => run())
  .catch(error => {
    console.log('Failed to connect to database', error);
  });