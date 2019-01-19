const juice = require('juice');
const fs = require('fs').promises;

module.exports = async function getEmailTemplate(crawler, templateName) {
  const filePath = `${__dirname}/${crawler}/emailTemplates/${templateName}.html`;

  const defaultCssFilePath = `${__dirname}/${crawler}/emailTemplates/style.css`;
  const templateCssFilePath = `${__dirname}/${crawler}/emailTemplates/${templateName}.css`;
  const data = await fs.readFile(filePath, 'utf-8');
  
  const juiceOptions = {
    extraCss: ''
  };

  const defaultCssFileExists = await fileExists(defaultCssFilePath);
  if(!defaultCssFileExists) {
    throw new Error('Default email templates css file missing.');
  }
  juiceOptions.extraCss += await fs.readFile(defaultCssFilePath, 'utf-8');

  const templateCssFileExists = await fileExists(templateCssFilePath);
  if(templateCssFileExists) {
    const css = await fs.readFile(templateCssFilePath, 'utf-8');
    juiceOptions.extraCss += css;
  }

  return juice(data, juiceOptions);
}

async function fileExists(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.isFile();
  } catch(err) {
    return false;
  }
}