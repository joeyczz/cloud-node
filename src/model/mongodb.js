const mongoose = require('mongoose');

const config = require('../config');
const logger = require('../utils/logger');

const options = {
  user: config.mongodb.user,
  pass: config.mongodb.pass,
  useNewUrlParser: true,
  // 不使用mongoose的缓存机制
  bufferCommands: false,
  // 自动重连
  autoReconnect: true,
  // 重连最大尝试次数
  reconnectTries: Number.MAX_VALUE,
  // 重连间隔
  reconnectInterval: 500,
  // 错误立即返回 断开连接
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  // 类似心跳检查
  keepAliveInitialDelay: 300000,
  keepAlive: true,
};

mongoose.connect(config.mongodb.database, options);

mongoose.connection.on('connected', () => {
  logger.info(`Mongoose connection open to ${config.mongodb.database}`);
});

mongoose.connection.on('error', (err) => {
  logger.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose connection disconnected');
});

mongoose.connection.on('reconnectFailed', () => {
  logger.info('Mongoose connection disconnected');
});

module.exports = mongoose;
