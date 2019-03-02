const mongoose = require("../monogodb");
const Schema = mongoose.Schema;

const BaseResponse = require("../../data/BaseResponse");
const constant = require("../../utils/constant");
const _ = require("lodash");

const User = mongoose.model(
  "users",
  new Schema({
    id: Schema.Types.ObjectId,
    status: Number,
    last_login_time: Date,
    last_login_ip: String,
    username: String,
    nickname: String,
    phone: String,
    email: String,
    // 查询结果排除密码
    salt: {
      type: String,
      select: false
    },
    // 查询结果排除密码
    password: {
      type: String,
      select: false
    },
    real_name: String,
    register_time: Date
  })
);

class UserModel {
  /**
   * insert
   */
  // 插入一条数据
  static inset(phone, md5Pwd, salt) {
    const response = new BaseResponse();
    return new Promise((resolve, reject) => {
      const user = new User({
        phone,
        salt,
        password: md5Pwd,
        status: constant.USER_STATUS.VALID,
        register_time: new Date()
      });
      user.save((err, res) => {
        if (err) {
          console.log("mongoose user insert res error", err);
          reject(err);
        } else {
          // 需要先过滤 salt 和 password 猜测肯能mongoose直接取了塞入的值  所以没有过滤
          const omitRes = _.omit(res.toObject(), ["salt", "password"]);
          console.log("mongoose res inset", omitRes);
          response.code = constant.RES_STATUS_SUCCESS;
          response.message = constant.RES_MESSAGE_SUCCESS;
          response.setValues(omitRes);
          resolve(response);
        }
      });
    });
  }

  /**
   * query
   */
  // 按手机号搜索用户
  static queryByPhone(phone) {
    const response = new BaseResponse();
    return new Promise((resolve, reject) => {
      User.findOne({ phone }, (err, res) => {
        if (err) {
          console.log("mongoose user query phone res error", err);
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

  // 按id搜索用户
  static queryById(id) {
    const response = new BaseResponse();
    return new Promise((resolve, reject) => {
      User.findOne({ _id: id }, (err, res) => {
        if (err) {
          console.log("mongoose user query id res error", err);
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

  // 按id搜索用户
  static queryPwdAndSaltById(id) {
    const response = new BaseResponse();
    return new Promise((resolve, reject) => {
      User.findOne({ _id: id }, { password: 1, salt: 1 }, (err, res) => {
        if (err) {
          console.log("mongoose user query id res error", err);
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

  // 按条件搜索用户
  static queryByParam(param) {
    const response = new BaseResponse();
    return new Promise((resolve, reject) => {
      User.find(param, (err, res) => {
        if (err) {
          console.log("mongoose user query param res error", err);
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

  // 搜索所有用户
  static queryAll() {
    const response = new BaseResponse();
    return new Promise((resolve, reject) => {
      User.find({}, (err, res) => {
        if (err) {
          console.log("mongoose user query all res error", err);
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

  /**
   * update
   */
  static findAndUpdatePassword(id, password, salt) {
    const response = new BaseResponse();
    return new Promise((resolve, reject) => {
      User.findByIdAndUpdate(
        id,
        { password, salt },
        { new: true },
        (err, res) => {
          if (err) {
            console.log("mongoose user find update res error", err);
            reject(err);
          } else {
            response.code = constant.RES_STATUS_SUCCESS;
            response.message = constant.RES_MESSAGE_SUCCESS;
            response.setValues(res);
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * delete
   * 逻辑删除
   */
  static findOneAndDelete(id) {
    const response = new BaseResponse();
    return new Promise((resolve, reject) => {
      User.findByIdAndUpdate(
        id,
        { status: constant.USER_STATUS.DELETE },
        { new: true },
        (err, res) => {
          if (err) {
            console.log("mongoose user find delete res error", err);
            reject(err);
          } else {
            response.code = constant.RES_STATUS_SUCCESS;
            response.message = constant.RES_MESSAGE_SUCCESS;
            response.setValues(res);
            resolve(response);
          }
        }
      );
    });
  }
}

module.exports = UserModel;
