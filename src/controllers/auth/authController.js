const express = require('express');
const router = express.Router();

const BaseResponse = require("../../data/baseResponse");
const service = require('../../services/auth/authService');
const _ = require("lodash");

/* POST auth listing. */
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
    response = await service.login(req.body.phone,  req.body.password);
  }
  res.send(response);
});

router.post('/logout', (req, res) => {
	const response = service.logout();
  res.send(response);
});

module.exports = router;
