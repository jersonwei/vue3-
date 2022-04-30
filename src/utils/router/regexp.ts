/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-04-30 10:01:24
 * @FilePath: \admin\src\utils\router\regexp.ts
 * @Description:
 */
/** 获取登录页面模块的动态路由的正则 */
export function getLoginModuleRegExp() {
  const modules: EnumType.LoginModuleKey[] = ['pwd-login', 'code-login', 'reset-pwd', 'bind-wechat'];
  return modules.join('|');
}
