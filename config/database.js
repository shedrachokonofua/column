const mongoose = require('mongoose');
module.exports = {
  async connect() {
    return mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
  }
}