/*
 * @Author: ZHENG
 * @Date: 2022-05-16 14:19:52
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-20 13:38:58
 * @FilePath: \work\src\service\api\course\label\label.ts
 * @Description:
 */
import { paramsToQuery } from '@/utils';
import { request } from '../../../request';
/** 获取标签列表 */
export function searchLabelList(params) {
  const query = paramsToQuery(params);
  const res = request.get(`/label/getLabelList${query}`);
  return res;
}

export function getLabels(params) {
  const res = request.get(`/label/getall`);
  return res;
}

// 保存或修改标签
export function saveOrUpdateLabel(params) {
  const res = request.post(`/label/saveOrUpdate`, params);
  return res;
}

// 删除标签
export function deleteLabel(params) {
  const res = request.delete(`/label/deleteLabel/${params}`);
  return res;
}
