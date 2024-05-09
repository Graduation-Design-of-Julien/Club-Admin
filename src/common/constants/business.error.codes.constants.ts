export const BUSINESS_ERROR_CODE = {
  COMMON: 10001, // 公共错误码
  TOKEN_INVALID: 10002, // 特殊错误码
  ACCESS_FORBIDDEN: 10003, // 禁止访问
  PERMISSION_DISABLED: 10003, // 权限已禁用

  USER_PASSWORD_INVALID: 200000, // 账号密码不正确
  USER_INVALID: 200001, // 用户无效
  ROLE_LEVEL_EXIST: 300001, // 身份已存在
  ROLE_INVALID: 300002, // 角色无效

  EXISTED: 400001, //已存在
  NO_EXIST: 400002, //不存在
  UPDATE_FAILED: 400003, //更新失败

  MENU_PARAM_INVALID: 500001,

  REGISTER_FAIL: 60000,
  DELETE_RECRUIT_FAIL: 60001, //报名失败
  NEW_RECRUIT_NO_EXIST: 60002, //不存在该纳新人员
};