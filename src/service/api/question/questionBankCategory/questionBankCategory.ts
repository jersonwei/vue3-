/*
 * @Author: ZHENG
 * @Date: 2022-05-25 08:32:18
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-25 09:49:54
 * @FilePath: \work\src\service\api\question\questionBankCategory\questionBankCategory.ts
 * @Description:
 */

import { paramsToQuery } from '@/utils';
import { request } from '@/service/request';

// 获取题库分类数据
export function getQuestionBankCategoryList(params) {
  const query = paramsToQuery(params);
  const res = request.get(`/questionBankCategory/listPage${query}`); //
  return res;
}
// 新增题库分类
export function addQuestionBankCategory(params) {
  const res = request.get(`/questionBankCategory/add`, params); //
  return res;
}
