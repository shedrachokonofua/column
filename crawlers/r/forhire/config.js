module.exports = {
  tasks: [
    {
      name: 'Find Dev Jobs',
      fn: function(){
        console.log('We here')
      },
      cronTime: '*/5 * * * * *'
    }
  ]
}