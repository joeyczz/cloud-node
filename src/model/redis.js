const redis = require('redis');

const config = require('../config');

const options = {
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  // 未连接 redis 不使用缓存
  enable_offline_queue: false,
  retry_strategy(opt) {
    // 必须return数字  否则中断连接
    if (opt.error && opt.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      console.log('The server refused the connection or network error');
      return opt.attempt * 100;
    }
    if (opt.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      console.log('Retry time exhausted');
      return opt.attempt * 100;
    }
    if (opt.attempt > 10) {
      console.log('times ', opt.attempt);
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(opt.attempt * 100, 3000);
  },
};

const client = redis.createClient(options);

// client.on('ready', () => {
//   console.log('Redis ready');
// });

client.on('connect', () => {
  console.log(`Redis connect to ${config.redis.host}:${config.redis.port}`);
});

client.on('reconnecting', (res) => {
  console.log('Redis reconnecting info:', res.attempt, res.error.code);
});

client.on('error', (err) => {
  console.log('Redis ERROR:', err);
});

client.on('end', () => {
  console.log('Redis end');
});

module.exports = client;
