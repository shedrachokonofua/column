const sgMail = require('@sendgrid/mail');
const { template: compileTemplate  } = require('lodash');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async function email({ sender, subject, template, data }) {
  const compiledTemplate = compileTemplate(template);
  const html = compiledTemplate(data);
  const emailData = {
    to: process.env.OWNER_EMAIL,
    from: {
      email: process.env.SENDER_EMAIL,
      name: sender
    },
    subject,
    html
  };
  await sgMail.send(emailData)
}