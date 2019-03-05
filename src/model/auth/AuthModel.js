// const _ = require('lodash');

const mongoose = require('../mongodb');
const redis = require('../redis');
const BaseResponse = require('../../data/BaseResponse');
const constant = require('../../utils/constant');

const { Schema } = mongoose;

const UserAuth = mongoose.model(
  'user_auth',
  new Schema({
    id: Schema.Types.ObjectId,
  }),
  'user_auth',
);

class AuthModel {
  // 搜索user auth
  static queryAll() {
    const response = new BaseResponse();
    return new Promise((resolve, reject) => {
      UserAuth.find({}, (err, res) => {
        if (err) {
          console.log('mongoose auth query all res error', err);
          reject(err);
        } else {
          response.code = constant.RES_STATUS_SUCCESS;
          response.message = constant.RES_MESSAGE_SUCCESS;
          response.setValues(res);
          resolve(response);
        }
      });
    });
  }

  // redis set verify code
  static setVerifyCode(id, code) {
    const response = new BaseResponse();
    const redisRes = redis.set(`verify_code:${id}`, code);
    if (!redisRes) {
      console.log('Redis set verify code error', redisRes);
      response.message = `Redis set verify code error ${redisRes}`;
      return Promise.reject(response);
    }
    response.code = constant.RES_STATUS_SUCCESS;
    response.message = constant.RES_MESSAGE_SUCCESS;
    response.setValues(redisRes);
    return Promise.resolve(response);
  }

  // redis get verify code
  static getVerifyCode(id) {
    const response = new BaseResponse();
    return new Promise((resolve, reject) => {
      redis.get(`verify_code:${id}`, (err, res) => {
        if (err) {
          console.log('Redis get verify code error', err);
          reject(err);
        } else {
          response.code = constant.RES_STATUS_SUCCESS;
          response.message = constant.RES_MESSAGE_SUCCESS;
          response.setValues(res);
          resolve(response);
        }
      });
    });
  }
}

module.exports = AuthModel;
