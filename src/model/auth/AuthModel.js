// const _ = require('lodash');

const mongoose = require('../mongodb');
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
}

module.exports = AuthModel;
