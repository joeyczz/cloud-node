const mongoose = require('mongoose');
const config = require('../config/baseConfig');


mongoose.connect(config.database, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
	console.log(`Mongoose connection open to ${config.database}`);
});

mongoose.connection.on('error', err => {
	console.log('Mongoose connection error:', err);
});

mongoose.connection.on ('disconnected', () => {
  console.log('Mongoose connection disconnected');
});

module.exports = mongoose;
