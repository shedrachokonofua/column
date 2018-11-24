const NodeEnvironment = require('jest-environment-node');
const path = require('path');
const fs = require('fs');
const globalConfigPath = path.join(__dirname, 'globalConfig.json');
const mongoose = require('mongoose')

module.exports = class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    console.log('Setup MongoDB Test Environment');

    const globalConfig = JSON.parse(fs.readFileSync(globalConfigPath, 'utf-8'));
    await mongoose.connect(globalConfig.mongoUri);
    await super.setup();
  }

  async teardown() {
    console.log('Teardown MongoDB Test Environment');
    await mongoose.connection.close();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
};