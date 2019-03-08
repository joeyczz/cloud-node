const mongoose = require('mongoose');

const config = require('../config');

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
  console.log(`Mongoose connection open to ${config.mongodb.database}`);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
});

mongoose.connection.on('reconnectFailed', () => {
  console.log('Mongoose connection disconnected');
});

module.exports = mongoose;
