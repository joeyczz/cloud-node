const md5 = require('md5');
const bcrypt = require('bcrypt');

const saltRounds = 8;

class PasswordUtil {
	constructor() {}
  
  static generateSalt() {
    return bcrypt.genSaltSync(saltRounds);
  }

	static md5WithSalt(password, salt) {
    return md5(`${salt}${password}:${salt}`);
	}

  static passwordEqual(password, salt, md5Pwd) {
    return md5WithSalt(password, salt) === md5Pwd;
  }
};

module.exports = PasswordUtil;
