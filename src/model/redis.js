const redis = require('redis');

const config = require('../config');
const logger = require('../utils/logger');

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
      logger.info('The server refused the connection or network error');
      return opt.attempt * 100;
    }
    if (opt.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      logger.info('Retry time exhausted');
      return opt.attempt * 100;
    }
    if (opt.attempt > 10) {
      // test 1
      logger.error('Retry time more than 10');
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(opt.attempt * 100, 3000);
  },
};

const client = redis.createClient(options);

client.on('connect', () => {
  logger.info(`Redis connect to ${config.redis.host}:${config.redis.port}`);
});

client.on('reconnecting', (res) => {
  logger.info('Redis reconnecting info:', res.attempt, res.error.code);
});

client.on('error', (err) => {
  logger.error('Redis ERROR:', err);
});

client.on('end', () => {
  logger.info('Redis end');
});

module.exports = client;
