/*
 * @Author: ZHENG
 * @Date: 2022-05-25 08:32:18
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-28 08:42:26
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

// 获取题库分类数据
export function getQuestionBankCategory(params) {
  const query = paramsToQuery(params);
  if (!params) {
    const res = request.get(`/questionBankCategory/list`); //
    return res;
  }
  const res = request.get(`/questionBankCategory/list${query}`); //
  return res;
}

// 新增题库分类
export function addQuestionBankCategory(params) {
  const res = request.post(`/questionBankCategory/add`, params); //
  return res;
}

// 编辑题库分类
export function editQuestionBankCategory(params) {
  const res = request.put(`/questionBankCategory/edit`, params); //
  return res;
}

// 删除题库分类 /questionBankCategory/delete
export function deleteQuestionBankCategory(params) {
  const query = paramsToQuery(params);
  const res = request.delete(`/questionBankCategory/delete${query}`); //
  return res;
}
