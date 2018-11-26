const constant = require('../utils/joeyConstant');
const _ = require('lodash');

class BaseResponse {
	constructor({ code, count, totalCount, page, totalPage, message, values, value } = {
	code: constant.RES_STATUS_ERROR,
	count: 0,
	totalCount: 0,
	page: -1,
	totalPage: 0,
	message: constant.RES_MESSAGE_ERROR,
	values: [],
	value: null
}) {
		this.code = code;
		this.count = count;
		this.totalCount = totalCount;
		this.page = page;
		this.totalPage = totalPage;
		this.message = message;
		this.values = values;
		this.value = value;
	}

	setValues(_values) {
		if (Array.isArray(_values) && _values.length > 0) {
      this.values = _values;
      this.value = _values[0];
    } else if (_.isObject(_values)) {
      this.values = [_values];
      this.value = _values;
    } else {
			this.values = [];
			this.value = null;
		}
	}

	addValue(_value) {
		if (!Array.isArray(this.values)) {
			this.values = [];
		}
		this.values.push(_value);
		this.value = this.values[0];
	}
};

module.exports = BaseResponse;
