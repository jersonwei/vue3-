/*
 * @Author: ZHENG
 * @Date: 2022-05-30 10:57:46
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-30 10:59:39
 * @FilePath: \work\src\service\api\course\course.ts
 * @Description:
 */

import { request } from '@/service/request';

// 获取课程分类
export function getcourseCategoryList() {
  const res = request.get(`/courseCategory/getList`);
  return res;
}
