const getLeads = require('./getLeads');
const saveLead = require('./saveLead');
const email = require('../../../modules/email/index');
const getEmailTemplate = require('../../getEmailTemplate');

module.exports = async function () {
  const leads = await getLeads();
  await Promise.all(leads.map(async (lead) => {
    const action = await saveLead(lead);
    if(action) {
      const emailTemplate = await getEmailTemplate('r/forhire', 'newLead');
      lead.description = lead.description.replace(/\n/g, '<div></div>');
      await email({
        sender: 'r/forhire Crawler', 
        subject: `New Lead: ${lead.title}`, 
        template: emailTemplate, 
        data: lead
      });
      console.log('Lead saved.', { lead });
    }
  }));
}