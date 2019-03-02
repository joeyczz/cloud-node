const BaseResponse = require("../../data/BaseResponse");
const constant = require("../../utils/constant");
const passwordUtil = require("../../utils/passwordUtil");
const _ = require("lodash");

const UserModel = require("../../model/user/UserModel");

class AuthService {
  /**
   * 登录
   * @param {*} phone
   * @param {*} password
   */
  static async login(phone, password) {
    const response = new BaseResponse();
    const queryRes = await UserModel.queryPwdAndSaltByPhone(phone);
    console.log(queryRes);
    if (queryRes.code !== constant.RES_STATUS_SUCCESS) {
      return Promise.reject(queryRes);
    } else if (_.isEmpty(queryRes.values)) {
      return Promise.reject(new Error("没有对应账号"));
    } else if (
      !passwordUtil.passwordEqual(
        password,
        queryRes.value.salt,
        queryRes.value.password
      )
    ) {
      return Promise.reject(new Error("密码不对"));
    }
    response.code = constant.RES_STATUS_SUCCESS;
    response.message = constant.RES_MESSAGE_SUCCESS;
    return response;
  }

  /**
   * 登出
   */
  static async logout() {
    const res = new BaseResponse();
    res.code = constant.RES_STATUS_SUCCESS;
    res.message = constant.RES_MESSAGE_SUCCESS;
    return res;
  }
}

module.exports = AuthService;
