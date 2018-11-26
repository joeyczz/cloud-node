const mongoose = require('../monogodb');
const Schema = mongoose.Schema;

const BaseResponse = require('../../data/baseResponse');
const constant = require('../../utils/joeyConstant');

const User = mongoose.model('users', new Schema({
  id: Schema.Types.ObjectId,
	name: String,
	phone: String,
	password: String,
	loginDate: Date,
}));

/**
 * insert
 */
// 插入一条数据
const inset = (phone, password) => {
	const response = new BaseResponse();

	return new Promise((resolve, reject) => {
		const user = new User({ phone, password });

		user.save((err, res) => {
			if (err) {
				console.log('mongoose user insert res error', err);
				reject(err);
			} else {
				response.code = constant.RES_STATUS_SUCCESS;
				response.message = constant.RES_MESSAGE_SUCCESS;
				console.log('mongoose res inset', res);
				resolve(response);
			}
		});

	});
};

/**
 * query
 */
// 按手机号搜索用户
const queryByPhone = phone => {
  const response = new BaseResponse();

  return new Promise((resolve, reject) => {
    User.find({phone}, (err, res) => {
      if (err) {
        console.log('mongoose user query phone res error', err);
        reject(err);
      } else {
        response.code = constant.RES_STATUS_SUCCESS;
        response.message = constant.RES_MESSAGE_SUCCESS;
        response.setValues(res);
        resolve(response);
      }
    });
  });
};

// 按id搜索用户
const queryById = id => {
  const response = new BaseResponse();

  return new Promise((resolve, reject) => {
    User.findOne({_id: id}, (err, res) => {
      if (err) {
        console.log('mongoose user query id res error', err);
        reject(err);
      } else {
        response.code = constant.RES_STATUS_SUCCESS;
        response.message = constant.RES_MESSAGE_SUCCESS;
        response.setValues(res);
        resolve(response);
      }
    });
  });
};

// 按条件搜索用户
const queryByParam = param => {
  const response = new BaseResponse();

  return new Promise((resolve, reject) => {
    User.find(param, (err, res) => {
      if (err) {
        console.log('mongoose user query param res error', err);
        reject(err);
      } else {
        response.code = constant.RES_STATUS_SUCCESS;
        response.message = constant.RES_MESSAGE_SUCCESS;
        response.setValues(res);
        resolve(response);
      }
    });
  });
};

// 搜索所有用户
const queryAll = () => {
	const response = new BaseResponse();

	return new Promise((resolve, reject) => {
		User.find({}, (err, res) => {
			if (err) {
        console.log('mongoose user query all res error', err);
        reject(err);
      } else {
        response.code = constant.RES_STATUS_SUCCESS;
        response.message = constant.RES_MESSAGE_SUCCESS;
        response.setValues(res);
        resolve(response);
			}
		});
	});
};

/**
 * update
 */
const findAndUpdatePassword = (id, password) => {
	const response = new BaseResponse();

	return new Promise((resolve, reject) => {
		User.findOneAndUpdate({_id: id}, {password: password},(err, res) => {
      if (err) {
        console.log('mongoose user find update res error', err);
        reject(err);
      } else {
        response.code = constant.RES_STATUS_SUCCESS;
        response.message = constant.RES_MESSAGE_SUCCESS;
        response.setValues(res);
        resolve(response);
      }
    });
	});
};

/**
 * delete
 */
const findOneAndDelete = id => {
  const response = new BaseResponse();

  return new Promise((resolve, reject) => {
    User.findOneAndDelete({_id: id}, (err, res) => {
      if (err) {
        console.log('mongoose user find delete res error', err);
        reject(err);
      } else {
        response.code = constant.RES_STATUS_SUCCESS;
        response.message = constant.RES_MESSAGE_SUCCESS;
        response.setValues(res);
        resolve(response);
      }
    });
	});
};

module.exports = {
	inset, queryByPhone, queryById, queryByParam, queryAll, findAndUpdatePassword, findOneAndDelete
};
