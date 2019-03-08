const log4js = require('log4js');

const localConfig = require('./local.conf');
const devConfig = require('./dev.conf');
const testConfig = require('./test.conf');
const proConfig = require('./pro.conf');

const logger = log4js.getLogger('config');

let configEnv = process.env.CONFIG_ENV || 'local';
configEnv = configEnv.toLowerCase();

// 当前环境
logger.info(`cur env is: ${configEnv}`);

// 初始化配置
let config = localConfig;

switch (configEnv) {
  case 'local':
    config = localConfig;
    break;
  case 'dev':
    config = devConfig;
    break;
  case 'test':
    config = testConfig;
    break;
  case 'pro':
    config = proConfig;
    break;
  default:
    config = localConfig;
    break;
}

module.exports = config;
