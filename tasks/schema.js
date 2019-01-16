const Joi = require('joi-cron-expression')(require('joi'));

module.exports = Joi.object().keys({
  crawler: Joi.string().required(), // Crawler Name
  name: Joi.string().required(), // Task Name
  fn: Joi.func().required(), // Task fn,
  cronTime: Joi.string().cron().required(), // Cron expression for scheduling task execution
});