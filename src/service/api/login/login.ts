/*
 * @Author: ZHENG
 * @Date: 2022-04-30 10:25:57
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-04-30 10:50:13
 * @FilePath: \admin\src\service\api\login\login.ts
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
  const res = request.get('/user/findUserInfo');
  return res;
}

// const loginApi: T.ILoginApi = {
//     login(params){
//         console.log(http);

//         return request.post('/user/login', params)
//     }
// }
// export default loginApi
