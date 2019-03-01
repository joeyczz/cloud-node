const BaseResponse = require('../../data/baseResponse');
const constant = require('../../utils/constant');

const userModel = require('../../model/user/userModel');

const _ = require('lodash');

/**
 * 注册用户
 * @param  {[type]} param   phone, password, code
 */
const register = async (phone, password) => {
  let response = new BaseResponse();

  const queryRes = await userModel.queryByPhone(phone);
  if (_.isNil(queryRes) || queryRes.code !== constant.RES_STATUS_SUCCESS || !_.isEmpty(queryRes.values)) {
    response.message = '手机号已被注册';
    return Promise.reject(response);
  }
  const insetRes = await userModel.inset(phone, password);
  if (_.isNil(insetRes) || insetRes.code !== constant.RES_STATUS_SUCCESS) {
    return Promise.reject(insetRes);
  }
  return insetRes;



  // return userModel.queryByPhone(phone).then(res => {
  //   if (res.code === constant.RES_STATUS_SUCCESS && _.isEmpty(res.values)) {
  //     return userModel.inset(phone, password);
  //   } else {
  //     response.message = '手机号已被注册';
  //     return Promise.reject(response);
  //   }
  // }).catch(err => Promise.reject(err)).then(res => {
  //   if (res.code === constant.RES_STATUS_SUCCESS) {
  //     return Promise.resolve(res);
  //   } else return Promise.reject(res);
  // }).catch(err => Promise.reject(err));
};

/**
 * 查询所有用户
 * @returns {Promise|*|PromiseLike<T>|Promise<T>}
 */
const queryAll = () => {
  return userModel.queryAll().then(res => {
    if (res.code === constant.RES_STATUS_SUCCESS)
      return Promise.resolve(res);
    else return Promise.reject(res);
  }).catch(err => Promise.reject(err));
};

/**
 * 查询某个用户
 * @param id
 */
const queryUser = id => {
  return userModel.queryById(id).then(res => {
    if (res.code === constant.RES_STATUS_SUCCESS)
      return Promise.resolve(res);
    else return Promise.reject(res);
  }).catch(err => Promise.reject(err));
};

/**
 * 重置密码
 * @param id
 * @param password
 * @returns {Promise<T>}
 */
const resetPassword = (id, password) => {
	return userModel.findAndUpdatePassword(id, password).then(res => {
    if (res.code === constant.RES_STATUS_SUCCESS)
      return Promise.resolve(res);
    else return Promise.reject(res);
  }).catch(err => Promise.reject(err));
};

/**
 * 按 id 删除
 * @param id
 * @returns {Promise<T>}
 */
const deleteById = id => {
  return userModel.findOneAndDelete(id).then(res => {
    if (res.code === constant.RES_STATUS_SUCCESS)
      return Promise.resolve(res);
    else return Promise.reject(res);
  }).catch(err => Promise.reject(err));
};

module.exports = { register, queryAll, queryUser, resetPassword, deleteById };
