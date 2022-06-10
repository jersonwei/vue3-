/*
 * @Author: ZHENG
 * @Date: 2022-06-10 11:45:32
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-10 11:46:36
 * @FilePath: \work\src\service\api\user\teacher\index.ts
 * @Description:
 */
// // 学生管理表格栏数据获取
import { paramsToQuery } from '@/utils';
import { request } from '@/service/request';
// import * as T from './types';

// 获取教师列表(带导出功能)
export function getTeacherTable(params) {
  const query = paramsToQuery(params);
  const res = request.get(`/teacher/list${query}`);
  return res;
}
