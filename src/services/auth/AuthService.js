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
   * @param ipStr
   */
  static async login(phone, password, ipStr) {
    const queryRes = await UserModel.queryPwdAndSaltByPhone(phone);
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
    // 更新上次登录ip
    if (ipStr) UserModel.findAndUpdateLastLoginInfo(queryRes.value._id, ipStr);
    const response = new BaseResponse();
    response.code = constant.RES_STATUS_SUCCESS;
    response.message = constant.RES_MESSAGE_SUCCESS;
    return response;
  }

  /**
   * 刷新token
   */
  static async refreshToken() {
    const res = new BaseResponse();
    res.code = constant.RES_STATUS_SUCCESS;
    res.message = constant.RES_MESSAGE_SUCCESS;
    return res;
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
