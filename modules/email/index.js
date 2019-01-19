const sgMail = require('@sendgrid/mail');
const { template } = require('lodash');

module.exports = async function email(subject, rawTemplate, data) {
  const compiledTemplate = template(rawTemplate);
  const html = compiledTemplate(data);
  const emailData = {
    to: process.env.OWNER_EMAIL,
    from: process.env.SENDER_EMAIL,
    subject,
    html
  };
  await sgMail.send(emailData)
}