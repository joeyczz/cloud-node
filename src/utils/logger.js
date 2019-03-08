const log4js = require('log4js');

const logger = log4js.getLogger();

log4js.configure({
  appenders: { joey: { type: 'file', filename: './logs/joey.log' } },
  categories: { default: { appenders: ['joey'], level: 'info' } },
});

module.exports = logger;
