/*
 * @Author: ZHENG
 * @Date: 2022-04-30 10:25:57
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-06 18:24:17
 * @FilePath: \e-class-admin\src\service\api\login\login.ts
 * @Description:
 */
/*
 * @Author: ZHENG
 * @Date: 2022-04-25 11:13:15
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-04-28 15:18:24
 * @FilePath: \index\src\service\api\login\login.ts
 * @Description:
 */
import { request } from '../../request';
import * as T from './types';
/** 登录 */
export function loginApi(params: T.ILoginParams) {
  const res = request.post('/login', params);
  return res;
}
/** 获取用户信息 */
export function findUserInfo() {
  const res = request.get('/user/getUserInfo');
  return res;
}
// 刷token的接口
export function UpdateToken(refreshToken: string) {
  return request.post<ApiAuth.Token>('/refreshToken', { refreshToken });
}

// const loginApi: T.ILoginApi = {
//     login(params){
//         console.log(http);

//         return request.post('/user/login', params)
//     }
// }
// export default loginApi
