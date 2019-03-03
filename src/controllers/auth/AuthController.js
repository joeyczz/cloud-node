const express = require("express");
const router = express.Router();
const _ = require("lodash");

const BaseResponse = require("../../data/BaseResponse");
const service = require("../../services/auth/AuthService");
const ipUtil = require("../../utils/ipUtil");
const jwtUtl = require("../../utils/jwtUtil");
const constant = require("../../utils/constant");

/* POST auth listing. */
/**
 * 登录
 */
router.post("/login", async (req, res) => {
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
    response = await service.login(req.body.phone, req.body.password, ipStr);
    if (response.code === constant.RES_STATUS_SUCCESS) {
      const payload = _.pick(response.value, ['_id', 'phone']);
      const token = await jwtUtl.sign(payload);
      res.cookie(constant.TOKEN, token, { httpOnly: true });
    }
  }
  res.send(response);
});

/**
 * 刷新token
 */
router.post("/refresh-token", async (req, res) => {
  let response = new BaseResponse();
  if (!_.isEmpty(req.user)) {
    const payload = _.pick(req.user, ['_id', 'phone']);
    const token = await jwtUtl.sign(payload);
    response.code = constant.RES_STATUS_SUCCESS;
    response.message = constant.RES_MESSAGE_SUCCESS;
    res.cookie(constant.TOKEN, token, { httpOnly: true });
  }
  res.send(response);
});

/**
 * 登出
 */
router.post("/logout", (req, res) => {
  const response = new BaseResponse();
  response.code = constant.RES_STATUS_SUCCESS;
  response.message = constant.RES_MESSAGE_SUCCESS;
  res.cookie(constant.TOKEN, 'token', { expires: new Date(), httpOnly: true });
  res.send(response);
});

module.exports = router;
