const _ = require("lodash");

const BaseResponse = require("../../data/BaseResponse");
const constant = require("../../utils/constant");
const passwordUtil = require("../../utils/passwordUtil");
const UserModel = require("../../model/user/UserModel");

class AuthService {
  /**
   * 登录
   * @param {*} phone
   * @param {*} password
   * @param ipStr
   */
  static async login(phone, password, ipStr) {
    let response = new BaseResponse();
    const queryRes = await UserModel.queryPwdAndSaltByPhone(phone);
    if (queryRes.code !== constant.RES_STATUS_SUCCESS) {
      response.message = queryRes.message;
      return response;
    } else if (_.isEmpty(queryRes.values)) {
      response.message = '没有对应账号';
      return response;
    } else if (
      !passwordUtil.passwordEqual(
        password,
        queryRes.value.salt,
        queryRes.value.password
      )
    ) {
      response.message = '密码不对';
      return response;
    }

    // 更新上次登录ip
    if (ipStr) UserModel.findAndUpdateLastLoginInfo(queryRes.value._id, ipStr);
    response.code = constant.RES_STATUS_SUCCESS;
    response.message = constant.RES_MESSAGE_SUCCESS;
    response.setValues({ phone, _id: queryRes.value._id });
    return response;
  }
}

module.exports = AuthService;
