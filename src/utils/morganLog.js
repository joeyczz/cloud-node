const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// 环境变量
const env = process.env.NODE_ENV;

// log file
const logDirectory = './logs';

// ensure log directory exists
if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);

// 文件路径
const logStream = fs.createWriteStream(path.join(logDirectory, '/node.log'), {
  flags: 'a',
});

let morganLog;
if (env !== 'development') {
  morganLog = morgan('dev');
} else {
  morganLog = morgan('combined', { stream: logStream });
}

module.exports = morganLog;
