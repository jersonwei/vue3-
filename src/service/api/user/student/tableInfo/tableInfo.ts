// // 学生管理表格栏数据获取
import { paramsToQuery } from '@/utils';
import { request } from '@/service/request';
// import * as T from './types';
// 获取学生列表
export function getStudentTableInfo(params) {
  const query = paramsToQuery(params);
  const res = request.get(`/student/list${query}`);
  return res;
}
// 新增学生/student
export function addStudent(params) {
  const res = request.post(`/student/`, params);
  return res;
}
// 导出
export const exportUserInfo = params => {
  return request.get(`/student/list`, params);
};
// 导入模板下载
export const downloadTemplate = () => {
  const res = request.get(`/student/downloadTemplate`);
  return res;
};
// 编辑学生
export function putStudent(params) {
  const res = request.put(`/student/updateStudent`, params);
  return res;
}
// 删除学生
export function deleteStudent(params) {
  // const query = paramsToQuery(params);
  const res = request.delete(`/deletecourse/${params.id}`);
  return res;
}

// 重置密码
export function resetPassword(params) {
  const res = request.put(`/student/resetPassword/${params.id}`);
  return res;
}
// 获取课程笔记
export function getNotesShowInfo(params) {
  const query = paramsToQuery(params);
  const res = request.get(`/notes/show${query}`);
  return res;
}

// 学生导入

// 学生导出

// 查看导出
