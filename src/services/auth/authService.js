const BaseResponse = require('../../data/baseResponse');
const constant = require('../../utils/constant');

const login = async (username, password) => {
	const res = new BaseResponse();
	res.code = constant.RES_STATUS_SUCCESS;
	res.message = constant.RES_MESSAGE_SUCCESS;

	const data = { username, password };
	res.addValue(data);
	return res;
};

const logout = () => {
	const res = new BaseResponse();
	res.code = constant.RES_STATUS_SUCCESS;
	res.message = constant.RES_MESSAGE_SUCCESS;
	return res;
};

module.exports = { login, logout };
