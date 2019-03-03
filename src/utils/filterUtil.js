const _ = require('lodash');

const filterWhiteList = require('./filterWhiteList');
const jwtUtil = require('./jwtUtil');
const constant = require('./constant');
const BaseResponse = require('../data/BaseResponse');

class filterUtil {
  static filter(req, res, next) {
    const inWhiteList = filterWhiteList.includes(req.path);
    if (inWhiteList) {
      next();
      return;
    }

    const response = new BaseResponse();
    const { token } = req.cookies;
    if (_.isNil(token)) {
      response.code = constant.RES_STATUS_NOLOGIN;
      response.message = '未登录';
      res.send(response);
      return;
    }

    // 验证token
    jwtUtil.verify(token).then((tokenRes) => {
      req.user = tokenRes;
      next();
    }).catch((err) => {
      console.log(err);
      response.code = constant.RES_STATUS_NOLOGIN;
      response.message = '登录超时';
      res.send(response);
    });
  }
}

module.exports = filterUtil;
