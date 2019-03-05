const _ = require('lodash');
const BaseResponse = require('../data/BaseResponse');

module.exports = (promise) => {
  if (promise instanceof Promise) {
    return promise
      .then(res => res)
      .catch((err) => {
        console.log(`promiseUtil: return Error ${err}`);
        return err;
      });
  }
  const response = new BaseResponse();
  response.message = _.isString(promise)
    ? `promiseUtil: Error ${promise}`
    : `promiseUtil: 缺少方法promise ${promise}`;
  return response;
};
