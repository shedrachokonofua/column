const crawl = require('./index');
const database = require('../../../config/database');

async function run() {
  try {
    await database.connect();
    await crawl();
  } catch(error) {
    console.log(error);
  }
}

run();