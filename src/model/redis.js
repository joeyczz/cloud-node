const redis = require('redis');

const config = require('../config/BaseConfig');

const options = {
  host: config.redis.host,
  port: config.redis.port,
  retry_strategy(opt) {
    if (opt.error && opt.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error('The server refused the connection');
    }
    if (opt.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error('Retry time exhausted');
    }
    if (opt.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(opt.attempt * 100, 3000);
  },
};

const client = redis.createClient(options);

client.on('connect', () => {
  console.log(`Redis connect to ${config.redis.host}:${config.redis.port}`);
});

client.on('reconnecting', (res) => {
  console.log('Redis reconnecting info:', res);
});

client.on('error', (err) => {
  console.log('Redis connect error:', err);
});

module.exports = client;
