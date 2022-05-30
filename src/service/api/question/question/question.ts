/*
 * @Author: ZHENG
 * @Date: 2022-05-30 14:28:27
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-30 14:28:29
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
