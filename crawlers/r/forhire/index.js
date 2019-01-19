const getLeads = require('./getLeads');
const saveLead = require('./saveLead');

module.exports = async function () {
  const leads = await getLeads();
  await Promise.all(leads.map(async (lead) => {
    const action = await saveLead(lead);
    if(action) {
      console.log('Lead saved.', { lead });
    }
  }));
}