module.exports = {
  apps : [{
    name: 'Task Runner',
    script: './tasks/index.js',
    exec_mode: 'cluster',
    instances: 1,
  }]
};
