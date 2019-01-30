const moment = require('moment');
const Lead = require('../../../modules/lead/index');

module.exports = async function () {
  console.log('CLEARING OUTDATED LEADS FROM DATABASE.');

  const limit = moment().subtract(2, 'days');
  const query = { source: 'R_FORHIRE', sourced: { $lt: limit } };

  const toBeDeleted = await Lead.find(query);
  toBeDeleted.forEach(lead => console.log('DELETING LEAD: ', lead));
  
  await Lead.deleteMany(query);

  console.log(`COMPLETED CLEARING OUTDATED LEADS. N: ${toBeDeleted.length}`);
}