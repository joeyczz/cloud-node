const _ = require('lodash');
const constant = require('../utils/constant');

class BaseResponse {
  constructor({
    code, count, totalCount, page, totalPage, message, values, value,
  } = {
    code: constant.RES_STATUS_ERROR,
    count: 0,
    totalCount: 0,
    page: -1,
    totalPage: -1,
    message: constant.RES_MESSAGE_ERROR,
    values: [],
    value: null,
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

  /**
   * 设置values
   */
  setValues(_values) {
    if (_.isArray(_values)) {
      this.values = _values;
      this.value = _.first(_values);
      this.totalCount = _values.length;
      this.count = _values.length;
    } else if (_.isObject(_values)) {
      this.values = [_values];
      this.value = _values;
      this.totalCount = 1;
      this.count = 1;
    } else {
      this.values = [];
      this.value = null;
    }
  }

  /**
   * 设置value
   */
  addValue(_value) {
    if (!_.isArray(this.values)) this.values = [];
    if (_.isArray(_value)) {
      this.values.push(..._value);
      this.value = _.first(this.values);
      this.totalCount += _value.length;
      this.count += _value.length;
    } else if (_.isObject(_value)) {
      this.values.push(_value);
      this.value = _.first(this.values);
      this.totalCount += 1;
      this.count += 1;
    }
  }
}

module.exports = BaseResponse;
