module.exports = {
  apps: [{
    name: 'dev',
    script: 'app.js',
    autorestart: true,
    watch: true,
    env: {
      NODE_ENV: 'development',
      CONFIG_ENV: 'dev',
    },
  }, {
    name: 'test',
    script: 'app.js',
    autorestart: true,
    watch: true,
    env: {
      NODE_ENV: 'development',
      CONFIG_ENV: 'test',
    },
  }, {
    name: 'pro',
    script: 'app.js',
    autorestart: true,
    watch: true,
    env: {
      NODE_ENV: 'production',
      CONFIG_ENV: 'pro',
    },
  }],
  // deploy: {
  //   production: {
  //     user: 'node',
  //     host: '212.83.163.1',
  //     ref: 'origin/master',
  //     repo: 'git@github.com:repo.git',
  //     path: '/var/www/production',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //   },
  // },
};
