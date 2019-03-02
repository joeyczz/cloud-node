const BaseResponse = require("../../data/BaseResponse");
const constant = require("../../utils/constant");

class AuthService {
  static async login(username, password) {
    const res = new BaseResponse();
    res.code = constant.RES_STATUS_SUCCESS;
    res.message = constant.RES_MESSAGE_SUCCESS;

    const data = { username, password };
    res.addValue(data);
    return res;
  }

  static async logout() {
    const res = new BaseResponse();
    res.code = constant.RES_STATUS_SUCCESS;
    res.message = constant.RES_MESSAGE_SUCCESS;
    return res;
  }
}

module.exports = AuthService;
