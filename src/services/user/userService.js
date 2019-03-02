const BaseResponse = require("../../data/baseResponse");
const constant = require("../../utils/constant");

const userModel = require("../../model/user/userModel");

const _ = require("lodash");

/**
 * 注册用户
 * @param  {[type]} param   phone, password, code
 */
const register = async (phone, password) => {
  let response = new BaseResponse();
  const queryRes = await userModel.queryByPhone(phone);
  if (
    queryRes.code !== constant.RES_STATUS_SUCCESS ||
    !_.isEmpty(queryRes.values)
  ) {
    response.message = "手机号已被注册";
    return Promise.reject(response);
  }
  const insetRes = await userModel.inset(phone, password);
  if (insetRes.code !== constant.RES_STATUS_SUCCESS)
    return Promise.reject(insetRes);
  return insetRes;
};

/**
 * 查询所有用户
 */
const queryAll = async () => {
  const res = await userModel.queryAll();
  if (res.code !== constant.RES_STATUS_SUCCESS) return Promise.reject(res);
  return res;
};

/**
 * 查询某个用户
 * @param id
 */
const queryUser = async id => {
  const res = await userModel.queryById(id);
  if (res.code !== constant.RES_STATUS_SUCCESS) return Promise.reject(res);
  return res;
};

/**
 * 重置密码
 * @param id
 * @param password
 */
const resetPassword = async (id, password) => {
  const res = await userModel.findAndUpdatePassword(id, password);
  if (res.code !== constant.RES_STATUS_SUCCESS) return Promise.reject(res);
  else if (_.isEmpty(res.values))
    return Promise.reject(new Error("没有对应账号"));
  return res;
};

/**
 * 按 id 删除
 * @param id
 */
const deleteById = async (id) => {
  const res = await userModel.findOneAndDelete(id);
  if (res.code !== constant.RES_STATUS_SUCCESS) return Promise.reject(res);
  return res;
};

module.exports = { register, queryAll, queryUser, resetPassword, deleteById };
