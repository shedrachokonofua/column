const crawl = require('./index')

module.exports = {
  tasks: [
    {
      name: 'Find Dev Jobs',
      fn: function(){
        crawl()
      },
      cronTime: '*/5 * * * * *'
    }
  ]
}