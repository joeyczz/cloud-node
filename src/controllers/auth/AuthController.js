const express = require('express');
const router = express.Router();

const BaseResponse = require("../../data/BaseResponse");
const service = require('../../services/auth/AuthService');
const _ = require("lodash");
const ipUtil = require("../../utils/ipUtil");

/* POST auth listing. */
/**
 * 登录
 */
router.post('/login', async (req, res) => {
  let response = new BaseResponse();
  if (_.isNil(req.body.phone) || req.body.phone.toString().trim() === "") {
    response.message = "手机号不能为空";
  } else if (
    _.isNil(req.body.password) ||
    req.body.password.toString().trim() === ""
  ) {
    response.message = "密码不能为空";
  } else {
    const ipStr = ipUtil.getClientIp(req);
    response = await service.login(req.body.phone,  req.body.password, ipStr);
  }
  res.send(response);
});

/**
 * 刷新token
 */
router.post('/refresh-token', async (req, res) => {
	const response = await service.refreshToken();
  res.send(response);
});

/**
 * 登出
 */
router.post('/logout', (req, res) => {
	const response = service.logout();
  res.send(response);
});

module.exports = router;
