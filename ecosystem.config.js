module.exports = {
  apps : [{
    name: 'Client',
    script: 'npm',
    args: 'run start-client',
    exec_mode: 'cluster',
    instances: 'max',
  }, {
    name: 'Task Runner',
    script: './tasks/index.js',
    exec_mode: 'cluster',
    instances: 1,
  }]
};
