/*
 * @Author: ZHENG
 * @Date: 2022-05-31 15:48:10
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-31 16:53:31
 * @FilePath: \work\src\service\api\question\pointManager\pointManager.ts
 * @Description:
 */
import { paramsToQuery } from '@/utils';
import { request } from '@/service/request';
// 获取知识点分页数据
export function getPointCategoryVoList(params) {
  const query = paramsToQuery(params);
  const res = request.get(`/pointCategory/getPointCategoryVoList${query}`); //
  return res;
}

// 新增知识点分类
export function addPointCategory(params) {
  const res = request.post(`/pointCategory/add`, params); //
  return res;
}

// 修改知识点分类
export function editPointCategory(params) {
  const res = request.put(`/pointCategory/edit`, params); //
  return res;
}

// 删除知识点分类
export function delPointCategory(params) {
  const res = request.delete(`/pointCategory/delete/${params.id}`); //
  return res;
}

// 新增知识点
export function addKnowledgePoint(params) {
  const res = request.post(`/knowledgePoint/add`, params); //
  return res;
}
// 编辑知识点
export function editKnowledgePoint(params) {
  const res = request.put(`/knowledgePoint/edit`, params); //
  return res;
}

// 删除知识点
export function delKnowledgePoint(params) {
  const res = request.delete(`/knowledgePoint/${params.id}`); //
  return res;
}

// 知识点启用和禁用
export function editStatusKnowledgePoint(params) {
  const res = request.put(`/knowledgePoint/editStatus/${params.pointId}/${params.status}`); //
  return res;
}
