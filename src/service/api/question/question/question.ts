/*
 * @Author: ZHENG
 * @Date: 2022-05-30 14:28:27
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-31 18:03:23
 * @FilePath: \work\src\service\api\question\question\question.ts
 * @Description:
 */
import { paramsToQuery } from '@/utils';
import { request } from '@/service/request';
// 获取题库分页数据
export function addPaperQuestion(params) {
  const res = request.post(`/paperQuestion/add`, params); //
  return res;
}
// 获取题库分页数据
export function uploadPaperQuestion(params) {
  const res = request.post(`/paperQuestion/upload`, params); //
  return res;
}

export function editStatusPaperQuestion(params) {
  const res = request.put(`/paperQuestion/editStatus`, params); //
  return res;
}
