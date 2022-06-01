/*
 * @Author: ZHENG
 * @Date: 2022-05-13 16:33:03
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-01 15:03:13
 * @FilePath: \work\src\service\api\paper\paper.ts
 * @Description:
 */

import { paramsToQuery } from '@/utils';
import { request } from '../../request';

// 新增习题
export function addPaper(params) {
  const res = request.post(`/paper/add`, params); //
  return res;
}
// 新增习题小节关联
export function addUnitPractice(params) {
  const res = request.post(`/unitPractice/add`, params); //
  return res;
}
// 修改习题小节关联
export function editUnitPractice(params) {
  const res = request.put(`/unitPractice/edit`, params); //
  return res;
}
// 获取习题列表
export function getPaperList(params) {
  const query = paramsToQuery(params);
  const res = request.get(`/paperQuestion/listPage${query}`); //
  return res;
}
// 获取习题小节关联列表
export function getUnitPracticeList(params) {
  const query = paramsToQuery(params);
  const res = request.get(`/unitPractice/listUnitPracticeInfo${query}`); //
  return res;
}

export function getPaperManagerList(params) {
  const query = paramsToQuery(params);
  const res = request.get(`/paper/listPage${query}`); //
  return res;
}
