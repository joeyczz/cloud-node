const express = require('express');
const router = express.Router();

const BaseResponse = require('../../data/baseResponse');
const service = require('../../services/user/userService');
const _ = require('lodash');

/* POST users listing. */
router.post('/register', async (req, res) => {
	let response = new BaseResponse();
	if (req.body.phone === undefined || req.body.phone === null || req.body.phone.toString().trim() === '') {
		response.message = '手机号不能为空';
	} else if (!/^1[0-9]{10}$/.test(req.body.phone)) {
		response.message = '手机号格式错误';
	} else if (req.body.password === undefined || req.body.password === null || req.body.password.toString().trim() === '') {
		response.message = '密码不能为空';
	} else if (!/[a-zA-Z]/.test(req.body.password) || !/[0-9]/.test(req.body.password)) {
		response.message = '密码需要包含字母和数字';
	} else if (req.body.password.length <= 6) {
		response.message = '密码需要6位数字';
	} else if (req.body.code.length !== 4 || !/[0-9]{4}/.test(req.body.code)) {
		response.message = '错误的验证码';
	} else {
    try {
      const sRes = await service.register(req.body.phone, req.body.password, req.body.code);
      response = sRes;
    } catch (err) {
    	response = err;
		}
	}
  res.send(response);
});

/**
 * 获取所有用户
 */
router.get('/users', async (req, res) => {
  let response = new BaseResponse();
	try {
    const sRes = await service.queryAll();
    response = sRes;
  } catch (err) {
    response = err;
  }
  res.send(response);
});

/**
 * 获取所有用户
 */
router.get('/user', async (req, res) => {
  let response = new BaseResponse();
  if (_.isEmpty(req.params.id)) {
    response.message = '用户id不能为空';
  } else {
  	try {
      response = await service.queryUser(req.params.id);
    } catch (err) {
			response = err;
    }
  }
  res.send(response);
});

/**
 * 修改用户密码
 */
router.put('/password', async (req, res) => {
  let response = new BaseResponse();
  if (_.isEmpty(req.body.id)) {
    response.message = '用户id不能为空';
  } else if (_.isEmpty(req.body.password)) {
    response.message = '密码不能为空';
  } else {
  	try {
      response = await service.resetPassword(req.body.id, req.body.password);
    } catch(err) {
  		response = err;
		}
  }
	res.send(response);
});

/**
 * 按id删除用户
 */
router.delete('/user', async (req, res) => {
  let response = new BaseResponse();
  if (_.isEmpty(req.body.id)) {
    response.message = '用户id不能为空';
  } else {
  	try {
      response = await service.deleteById(req.body.id);
		} catch (err) {
			response = err;
    }
	}
  res.send(response);
});

module.exports = router;
