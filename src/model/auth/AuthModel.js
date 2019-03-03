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
  static async setVerifyCode(id, code) {
    const response = new BaseResponse();
    const redisRes = await redis.set(`verify_code:${id}`, code);
    if (redisRes) {
      console.log(redisRes);
    }
    return response;
  }

  // redis get verify code
  static async getVerifyCode(id) {
    const response = new BaseResponse();
    const redisRes = redis.get(`verify_code:${id}`);
    if (redisRes) {
      console.log(redisRes);
    }
    return response;
  }
}

module.exports = AuthModel;
