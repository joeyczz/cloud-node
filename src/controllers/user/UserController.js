const express = require('express');

const router = express.Router();
const _ = require('lodash');

const BaseResponse = require('../../data/BaseResponse');
const service = require('../../services/user/UserService');
const ipUtil = require('../../utils/ipUtil');
const jwtUtl = require('../../utils/jwtUtil');
const constant = require('../../utils/constant');

/* POST users listing. */
/**
 * 注册
 */
router.post('/register', async (req, res) => {
  let response = new BaseResponse();
  if (_.isNil(req.body.phone) || req.body.phone.toString().trim() === '') {
    response.message = '手机号不能为空';
  } else if (!/^1[0-9]{10}$/.test(req.body.phone)) {
    response.message = '手机号格式错误';
  } else if (
    _.isNil(req.body.password) ||
    req.body.password.toString().trim() === ''
  ) {
    response.message = '密码不能为空';
  } else if (
    !/[a-zA-Z]/.test(req.body.password) ||
    !/[0-9]/.test(req.body.password)
  ) {
    response.message = '密码需要包含字母和数字';
  } else if (req.body.password.length <= 6) {
    response.message = '密码需要6位字母+数字';
  } else if (
    _.isNil(req.body.code) ||
    req.body.code.length !== 4 ||
    !/[0-9]{4}/.test(req.body.code)
  ) {
    response.message = '错误的验证码';
  } else {
    const ipStr = ipUtil.getClientIp(req);
    response = await service.register(
      req.body.phone,
      req.body.password,
      req.body.code,
      ipStr,
    );
    if (response.code === constant.RES_STATUS_SUCCESS) {
      const payload = _.pick(response.value, ['_id', 'phone']);
      const token = await jwtUtl.sign(payload);
      res.cookie(constant.TOKEN, token, { httpOnly: true });
    }
  }
  res.send(response);
});

/**
 * 获取所有用户
 */
router.get('/users', async (req, res) => {
  const response = await service.queryAll();
  res.send(response);
});

/**
 * 获取单个用户
 */
router.get('/user', async (req, res) => {
  const response = await service.queryUser(req.user._id);
  res.send(response);
});

/**
 * 修改用户密码
 */
router.put('/password', async (req, res) => {
  let response = new BaseResponse();
  if (_.isNil(req.body.password)) {
    response.message = '密码不能为空';
  } else if (_.isNil(req.body.oldPwd)) {
    response.message = '旧密码不能为空';
  } else {
    response = await service.resetPassword(
      req.user._id,
      req.body.password,
      req.body.oldPwd,
    );
  }
  res.send(response);
});

/**
 * 按id删除用户
 */
router.delete('/user', async (req, res) => {
  const response = await service.deleteById(req.user._id);
  res.send(response);
});

module.exports = router;
