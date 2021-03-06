// 常量数据
const USER_STATUS = {
  INVALID: 0, // 无效
  VALID: 1, // 有效
  DELETE: 2, // 删除
};

module.exports = {
  // 网络状态
  RES_STATUS_SUCCESS: 200,
  RES_STATUS_ERROR: 400,
  RES_STATUS_NOLOGIN: 600,
  RES_STATUS_NOAUTH: 800,

  RES_MESSAGE_SUCCESS: '成功',
  RES_MESSAGE_ERROR: '失败',
  RES_MESSAGE_NOAUTH: '无权限',
  RES_MESSAGE_NOLOGIN: '未登录',

  // 用户状态
  USER_STATUS,

  // token
  TOKEN: 'token',
};
