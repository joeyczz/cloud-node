module.exports = {
  network: {
    port: '8080',
  },
  mongodb: {
    database: 'mongodb://127.0.0.1:27017/joey',
  },
  redis: {
    host: '127.0.0.1',
    port: '6379',
    ttl: 1000 * 60 * 2,
  },
};
