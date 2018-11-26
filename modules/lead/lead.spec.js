const Lead = require('./index');
const moment = require('moment');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(global.MONGO_URI, { useNewUrlParser: true });
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
      source: 'r/forhire',
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

describe('#removeOutdated', () => {
  beforeEach(async () => {
    await Lead.create({
      title: 'test_case_1',
      description: 'test',
      sourced: new Date(),
      posted: moment().subtract(3, 'days').toDate(),
      source: 'r/forhire',
      link: 'http://test.com'
    });
  });
  test('should remove leads older than 2 days', async () => {
    expect.assertions(1);
    await Lead.removeOutdated();
    const count = await Lead.countDocuments({ title: 'test_case_1' });
    expect(count).toBe(1);
  });
})