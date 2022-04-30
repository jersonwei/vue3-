/*
 * @Author: ZHENG
 * @Date: 2022-04-30 10:26:10
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-04-30 10:26:13
 * @FilePath: \admin\src\service\api\login\types.ts
 * @Description:
 */
/*
 * @Author: ZHENG
 * @Date: 2022-04-25 11:13:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-04-28 14:14:45
 * @FilePath: \index\src\service\api\login\types.ts
 * @Description:
 */

import internal from 'stream';

/**
 * @author: ZHENG
 * @description: 登录的类型
 * @param {
 *      account 账号
 *      password 密码
 *      role 角色类型 2022-4-27 默认为1
 *      validateCode 验证码
 * }
 * @return {
 *      "success": true
 *      "code": 20000,
 *      "message": "登录成功"
 * }
 */
export interface ILoginParams {
  account: string;
  password: string | number;
  role: number;
  validateCode: string | number;
}
export interface ILoginApi {
  login: (params: ILoginParams) => Promise<any>;
}

/**
 * @author: ZHENG
 * @description: 验证码参数
 */
export interface checkCaptchaParams {
  recode: string;
}

export interface forgetPwdFMail {
  identifier: string;
  accountType: number;
}

// export interface ICheckCaptchaApi {
//     checkCaptcha: (params: checkCaptchaParams)=> Promise<any>
//     forgetPwdFMail:(params: forgetPwdFMail)=> Promise<any>
// }
