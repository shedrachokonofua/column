const crawl = require('./index')
const removeOutdated = require('./removeOutdated')

module.exports = {
  tasks: [
    {
      name: 'Find Dev Jobs',
      fn: crawl,
      cronTime: '*/5 * * * *' // Every 5 minutes
    },
    {
      name: 'Clear Outdated Leads from Database',
      fn: removeOutdated,
      cronTime: '0 0 * * *' // Every day
    }
  ]
}