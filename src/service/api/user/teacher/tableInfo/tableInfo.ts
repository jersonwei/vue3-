// // 学生管理表格栏数据获取
import { paramsToQuery } from '@/utils';
import { request } from '@/service/request';
// import * as T from './types';
// // 学生表格栏数据获取
// export function getStudentTableInfo() {
//   const res = request.get(`/student/list`);
//   return res;
// }

export function getStudentTableInfo(params) {
  const query = paramsToQuery(params);
  const res = request.get(`/student/list${query}`);
  return res;
}
