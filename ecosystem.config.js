module.exports = {
  apps : [{
    name: 'Client',
    cwd: './client/',
    script: 'server.js',
    exec_mode: 'cluster',
    instances: 1,
  }, {
    name: 'Task Runner',
    script: './tasks/index.js',
    exec_mode: 'cluster',
    instances: 1,
  }]
};
