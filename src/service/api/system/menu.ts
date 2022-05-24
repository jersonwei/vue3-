/*
 * @Author: ZHENG
 * @Date: 2022-05-04 18:04:28
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-05 18:30:35
 * @FilePath: \e-class-admin\src\service\api\system\menu.ts
 * @Description:
 */
import { mockRequest } from '../../request';

export function getMenuList() {
  const res = mockRequest.get('/menu/list');
  return res;
}
