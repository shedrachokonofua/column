const moment = require('moment');
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
      lead.description = cleanDescription(lead.description)
      lead.fineDate = moment(lead.posted).fromNow();

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

function cleanDescription(description) {
  return description
    .replace(/\n/g, '<div></div>') // Replace new line with empty div
    .replace(/&amp;#x200B;/g, '<div></div>') // Replace reddit space holder with empty div
    .replace(/\*\*([^\*\*]*)+\*\*/g, '<b>$1</b>') // Convert bold text from reddit format
    .replace(/\[(.*)\]\((.*)\)/g, '<a href="$2">$1</a>') // Convert links from reddit format
}