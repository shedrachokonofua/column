const Lead = require('./index');
const moment = require('moment');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(global.MONGODB_URI, { useNewUrlParser: true });
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('#create', () => {
  test('should fail if link is invalid', async () => {
    expect.assertions(3);
    const testData = {
      title: 'test',
      description: 'test',
      sourced: new Date(),
      posted: new Date(),
      source: 'R_FORHIRE',
      link: 'testdotcom'
    };
    try {
      await Lead.create(testData);
    } catch(e) {
      expect(Object.keys(e.errors).length).toBe(1);
      expect(Object.keys(e.errors)).toContain('link');
      expect(e.errors.link.message).toBe('Invalid link: testdotcom');
    }
  });
});