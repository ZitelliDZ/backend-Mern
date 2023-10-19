module.exports = {
  apps: [
    {
      name: 'TFC AsistenciaUGD',
      script: './src/index.js',
      watch: false,
      max_memory_restart: '1000M',
      exec_mode: 'cluster',
      instances: 1,
      cron_restart: '59 23 * * *',
      env: {
        NODE_ENV: 'development' // development or production
      }
    }
  ]

}
