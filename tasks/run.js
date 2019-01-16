const cron = require('node-cron');
const getAllTasks = require('./getAllTasks');

module.exports = async () => {
  const tasks = await getAllTasks();
  for(const task of tasks) {
    cron.schedule(task.cronTime, function () {
      console.log(`Running Task: \n\tCrawler: ${task.crawler}\n\tName: ${task.name}`)
      task.fn();
    });
  }
}