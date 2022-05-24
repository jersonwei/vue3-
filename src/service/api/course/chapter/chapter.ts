/*
 * @Author: ZHENG
 * @Date: 2022-05-12 08:53:14
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-23 19:47:15
 * @FilePath: \work\src\service\api\course\chapter\chapter.ts
 * @Description: 课程
 */
import { paramsToQuery } from '@/utils';
import { request } from '../../../request';

// 获取章节数据
export function getChapterList(params) {
  const res = request.post(`/chapter/list`, params);
  return res;
}

/** 新增章节 */
export function addChapter(params) {
  // const query = paramsToQuery(params);
  // const res = request.get('/searchCouserInfo', params);
  const res = request.post(`/chapter/add`, params);
  return res;
}

/** 编辑章节 */
export function editChapter(params) {
  // const query = paramsToQuery(params);
  // const res = request.get('/searchCouserInfo', params);
  const res = request.put(`/chapter/edit`, params);
  return res;
}

export function delChapter(params) {
  const query = paramsToQuery(params);
  const res = request.delete(`/chapter/delete${query}`);
  return res;
}

/** 修改或者新增课时信息，并上传文件 */
export function saveOrUpdateUnit(params) {
  const res = request.post(`/unit/saveOrUpdate`, params);
  return res;
}
