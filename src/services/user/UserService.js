const BaseResponse = require("../../data/BaseResponse");
const constant = require("../../utils/constant");
const passwordUtil = require("../../utils/passwordUtil");
const _ = require("lodash");

const UserModel = require("../../model/user/UserModel");

class UserService {
  /**
   * 注册用户
   * @param  {[type]} param   phone, password, code
   */
  static async register(phone, password, code, ipStr) {
    let response = new BaseResponse();
    const queryRes = await UserModel.queryByPhone(phone);
    if (
      queryRes.code !== constant.RES_STATUS_SUCCESS ||
      !_.isEmpty(queryRes.values)
    ) {
      response.message = "手机号已被注册";
      return Promise.reject(response);
    }
    const salt = passwordUtil.generateSalt();
    const md5Pwd = passwordUtil.md5WithSalt(password, salt);
    const insetRes = await UserModel.inset(phone, md5Pwd, salt, ipStr);
    if (insetRes.code !== constant.RES_STATUS_SUCCESS)
      return Promise.reject(insetRes);
    return insetRes;
  }

  /**
   * 查询所有用户
   */
  static async queryAll() {
    const res = await UserModel.queryAll();
    if (res.code !== constant.RES_STATUS_SUCCESS) return Promise.reject(res);
    return res;
  }

  /**
   * 查询某个用户
   * @param id
   */
  static async queryUser(id) {
    const res = await UserModel.queryById(id);
    if (res.code !== constant.RES_STATUS_SUCCESS) return Promise.reject(res);
    else if (_.isEmpty(res.values))
      return Promise.reject(new Error("没有对应账号"));
    return res;
  }

  /**
   * 修改密码
   * @param id
   * @param password
   * @param oldPwd
   */
  static async resetPassword(id, password, oldPwd) {
    const queryRes = await UserModel.queryPwdAndSaltById(id);
    if (queryRes.code !== constant.RES_STATUS_SUCCESS) {
      return Promise.reject(queryRes);
    } else if (_.isEmpty(queryRes.values)) {
      return Promise.reject(new Error("没有对应账号"));
    } else if (
      !passwordUtil.passwordEqual(
        oldPwd,
        queryRes.value.salt,
        queryRes.value.password
      )
    ) {
      return Promise.reject(new Error("旧密码不对"));
    }
    // 创建md5 密码
    const salt = passwordUtil.generateSalt();
    const md5Pwd = passwordUtil.md5WithSalt(password, salt);
    const res = await UserModel.findAndUpdatePassword(id, md5Pwd, salt);
    if (res.code !== constant.RES_STATUS_SUCCESS) return Promise.reject(res);
    else if (_.isEmpty(res.values))
      return Promise.reject(new Error("没有对应账号"));
    return res;
  }

  /**
   * 按 id 删除
   * @param id
   */
  static async deleteById(id) {
    const res = await UserModel.findOneAndDelete(id);
    if (res.code !== constant.RES_STATUS_SUCCESS) return Promise.reject(res);
    else if (_.isEmpty(res.values))
      return Promise.reject(new Error("没有对应账号"));
    return res;
  }
}
module.exports = UserService;
