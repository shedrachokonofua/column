const joi = require('joi');
const crawlers = require('../crawlers/crawlers');
const schema = require('./schema');
const fs = require('fs').promises;

async function getConfigFiles() {
  const configFiles = [];

  for(const crawlerName in crawlers) {
    const dirName = crawlers[crawlerName];
    const configPath = `${__dirname}/../crawlers/${dirName}/config.js`;
    const stat = await fs.stat(configPath);
    if(stat.isFile()) {
      const config = require(configPath);
      config.__name__ = crawlerName
      configFiles.push(config);
    }
  };

  return configFiles;
}

module.exports = async function getAllTasks() {
  let configFiles = await getConfigFiles();
  const tasks = configFiles
    .filter(config => config.hasOwnProperty('tasks')) // Ensure config has tasks property
    .filter(config => Array.isArray(config.tasks)) // Ensure tasks property is an array
    .map(config => {
      // Add crawler name to each task
      config.tasks.map(task => {
        task.crawler = config.__name__;
        return task;
      });
      return config;
    })
    .map(config => config.tasks) // Get array of tasks
    .reduce((acc, curr) => acc.concat(curr)) // Flatten array
    .filter(task => {
      // Validate tasks
      const validation = joi.validate(task, schema);
      if(validation.error) {
        console.log('Invalid task: ') 
        console.log(validation.error);
      }
      return !validation.error;
    })
  return tasks;
}
