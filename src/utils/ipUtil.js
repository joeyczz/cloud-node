class ipUtil {
  static getClientIp(req) {
    const ipStr = req.ip ||
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || '';
    const ipMatch = ipStr.match(/\d+.\d+.\d+.\d+/);
    return ipMatch ? ipMatch.join('.') : null;
  }
}

module.exports = ipUtil;
