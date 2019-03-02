const jwt = require('jsonwebtoken');
const fs = require('fs');
const _ = require('lodash');
const jwtSecret = fs.readFileSync(__dirname + '/jwtSecret').toString();

class jwtUtil {

  static sign(payload) {
    if (_.isEmpty(payload)) return null;
    return new Promise((resolve, reject) => {
      jwt.sign(payload, jwtSecret, { expiresIn: '7d' }, (err, token) => {
        if (err) return reject(err);
        else return resolve(token);
      });  
    })
  }

  static verify(token) {
    if (_.isNil(token)) return null;
    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) return reject(err);
        else return resolve(decoded);
      });
    })
  }

}

module.exports = jwtUtil;
