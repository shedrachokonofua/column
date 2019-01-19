const mongoose = require('mongoose');
module.exports = {
  async connect() {
    return mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  }
}