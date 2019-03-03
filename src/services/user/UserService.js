const _ = require("lodash");

const BaseResponse = require("../../data/BaseResponse");
const constant = require("../../utils/constant");
const passwordUtil = require("../../utils/passwordUtil");
const UserModel = require("../../model/user/UserModel");

class UserService {
  /**
   * 注册用户
   * @param  {[type]} param   phone, password, code
   */
  static async register(phone, password, code, ipStr) {
    let response = new BaseResponse();
    const queryRes = await UserModel.queryByPhone(phone);
    if (queryRes.code !== constant.RES_STATUS_SUCCESS) {
      response.message = queryRes.message;
      return response;
    } else if (!_.isEmpty(queryRes.values)) {
      response.message = "手机号已被注册";
      return response;
    }
    
    // 新增用户
    const salt = passwordUtil.generateSalt();
    const md5Pwd = passwordUtil.md5WithSalt(password, salt);
    const insetRes = await UserModel.inset(phone, md5Pwd, salt, ipStr);
    if (insetRes.code !== constant.RES_STATUS_SUCCESS) {
      response.message = insetRes.message;
      return response;
    }
    return insetRes;
  }

  /**
   * 查询所有用户
   */
  static async queryAll() {
    let response = new BaseResponse();
    const queryRes = await UserModel.queryAll();
    if (queryRes.code !== constant.RES_STATUS_SUCCESS) {
      response.message = queryRes.message;
      return response;
    }
    return queryRes;
  }

  /**
   * 查询某个用户
   * @param id
   */
  static async queryUser(id) {
    let response = new BaseResponse();
    const queryRes = await UserModel.queryById(id);
    if (queryRes.code !== constant.RES_STATUS_SUCCESS) {
      response.message = queryRes.message;
      return response;
    } else if (_.isEmpty(queryRes.values)) {
      response.message = "没有对应账号";
      return response;
    }
    return queryRes;
  }

  /**
   * 修改密码
   * @param id
   * @param password
   * @param oldPwd
   */
  static async resetPassword(id, password, oldPwd) {
    const response = new BaseResponse();
    const queryRes = await UserModel.queryPwdAndSaltById(id);
    if (queryRes.code !== constant.RES_STATUS_SUCCESS) {
      response.message = queryRes.message;
      return response;
    } else if (_.isEmpty(queryRes.values)) {
      response.message = "没有对应账号";
      return response;
    } else if (
      !passwordUtil.passwordEqual(
        oldPwd,
        queryRes.value.salt,
        queryRes.value.password
      )
    ) {
      response.message = "旧密码不对";
      return response;
    }

    // 创建md5 密码
    const salt = passwordUtil.generateSalt();
    const md5Pwd = passwordUtil.md5WithSalt(password, salt);
    const updateRes = await UserModel.findAndUpdatePassword(id, md5Pwd, salt);
    if (updateRes.code !== constant.RES_STATUS_SUCCESS) {
      response.message = updateRes.message;
      return response;
    } else if (_.isEmpty(updateRes.values)) {
      response.message = "没有对应账号";
      return response;
    }
    return updateRes;
  }

  /**
   * 按 id 删除
   * @param id
   */
  static async deleteById(id) {
    let response = new BaseResponse();
    const deleteRes = await UserModel.findOneAndDelete(id);
    if (deleteRes.code !== constant.RES_STATUS_SUCCESS) {
      response.message = deleteRes.message;
      return response;
    } else if (_.isEmpty(deleteRes.values)) {
      response.message = "没有对应账号";
      return response;
    }
    return deleteRes;
  }
}
module.exports = UserService;
