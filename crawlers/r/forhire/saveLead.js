const Lead = require('../../../modules/lead/index');

module.exports = async function saveLead(lead) {
  try {
    const leadDocument = new Lead(lead);
    await leadDocument.validate();

    const sameLeadCount = await Lead.countDocuments({ link: lead.link });
    if(sameLeadCount > 0) {
      console.log('Lead already exists.', { lead });
      return false;
    }

    await leadDocument.save();
    return true;
  } catch(error) {
    console.log('Error saving lead', {
      lead,
      error
    })
  }
}