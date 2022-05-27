/*
 * @Author: ZHENG
 * @Date: 2022-05-27 16:53:54
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-27 17:38:57
 * @FilePath: \work\src\service\api\question\examination\examination.ts
 * @Description:
 */
import { paramsToQuery } from '@/utils';
import { request } from '@/service/request';

// 获取题库分类数据
export function getExampaperclassificationList(params) {
  const query = paramsToQuery(params);
  const res = request.get(`/exampaperclassification/list${query}`); //
  return res;
}

/**
 * @author: ZHENG
 * @description: 获取用户课程下拉框
 * @return {*}
 */
export function getTeacherCourse() {
  const res = request.get(`/getTeacherCourse`); //
  return res;
}

export function addExampaperclassification(params) {
  const res = request.post(`/exampaperclassification/saveOrUpdate`, params); //
  return res;
}

export function delExampaperclassification(params) {
  const res = request.delete(`/exampaperclassification/${params}`); //
  return res;
}
