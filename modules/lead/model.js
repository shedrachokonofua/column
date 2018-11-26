const mongoose = require('mongoose');
const moment = require('moment');
const schema = require('./schema');

class Lead {
  static async removeOutdated() {
    const limit = moment().subtract(2, 'days').startOf('day');
    await this.deleteMany({ posted: { $gt: limit } });
  }
}

schema.loadClass(Lead);
module.exports = mongoose.model('Lead', schema);