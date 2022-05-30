/*
 * @Author: ZHENG
 * @Date: 2022-05-06 08:46:39
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-30 11:01:23
 * @FilePath: \work\src\service\api\system\dictionary.ts
 * @Description:
 */
import { request } from '../../request';
// import * as T from './types';
// 获取字典树形数据
export function getDictType() {
  const res = request.post('/dictType/listInfo');
  return res;
}
// 获取字典数据
export function getDictList(Param) {
  const res = request.get(`/dict/list?type=${Param.type}&pageSize=${Param.pageSize}&current=${Param.current}`); //
  return res;
}

// 新建字典树形
export function addDictType(Param) {
  const res = request.post(`/dictType/add`, Param);
  return res;
}
// 编辑删除字典树形
export function editDictType(Param) {
  const res = request.post(`/dictType/edit`, Param);
  return res;
}

export function addDict(Param) {
  const res = request.post(`/dict/add`, Param);
  return res;
}

export function editDict(Param) {
  const res = request.post(`/dict/edit`, Param);
  return res;
}

// 数据字典统一查询接口
export function getCourseStatus(param) {
  const res = request.get(`/getCourseStatus/${param}`);
  return res;
}
