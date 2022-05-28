/*
 * @Author: ZHENG
 * @Date: 2022-05-27 17:45:03
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-28 15:07:04
 * @FilePath: \work\src\service\api\question\questionBank\questionBank.ts
 * @Description:
 */
import { paramsToQuery } from '@/utils';
import { request } from '@/service/request';
// 获取题库数据
export function getQuestionBankList(params) {
  const query = paramsToQuery(params);
  const res = request.get(`/questionBank/listPage${query}`); //
  return res;
}

// 新增题库数据
export function addQuestionBank(params) {
  const res = request.post(`/questionBank/add`, params); //
  return res;
}

// 编辑题库数据
export function editQuestionBank(params) {
  const res = request.put(`/questionBank/edit`, params); //
  return res;
}

// 修改题库状态数据
export function editQuestionBankStatus(params) {
  const res = request.put(`/questionBank/editStatus`, params); //
  return res;
}

// 删除题库数据
export function delQuestionBank(params) {
  const query = paramsToQuery(params);
  const res = request.delete(`/questionBank/delete${query}`); //
  return res;
}
