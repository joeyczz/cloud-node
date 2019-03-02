const md5 = require('md5');

class PasswordUtil {
	constructor() {}
  
  static generateSalt() {
    return Math.random().toString().slice(2, 5);
  }

	static md5WithSalt(val, salt) {
    return md5(`${salt}${val}:${salt}`);
	}

};

module.exports = PasswordUtil;
