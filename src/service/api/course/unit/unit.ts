/*
 * @Author: ZHENG
 * @Date: 2022-05-13 13:33:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-23 19:16:42
 * @FilePath: \work\src\service\api\course\unit\unit.ts
 * @Description:
 */
import { paramsToQuery } from '@/utils';
import { request } from '../../../request';

// 新增和修改小节信息
export function unitAdd(params) {
  // const query = paramsToQuery(params);
  // const res = request.get('/searchCouserInfo', params);
  const res = request.post(`/unit/save`, params);
  return res;
}

export function getUnitList(params) {
  // const query = paramsToQuery(params);
  // const res = request.get('/searchCouserInfo', params);
  const res = request.post(`/unit/list`, params);
  return res;
}

// 删除课时接口
export function deleteUnit(params) {
  const query = paramsToQuery(params);
  const res = request.delete(`/unit/delete${query}`);
  return res;
}
