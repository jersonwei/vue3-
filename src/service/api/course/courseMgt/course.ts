/*
 * @Author: ZHENG
 * @Date: 2022-05-04 09:02:06
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-30 10:59:38
 * @FilePath: \work\src\service\api\course\courseMgt\course.ts
 * @Description:
 */
/*
 * @Author: ZHENG
 * @Date: 2022-04-30 10:25:57
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-01 19:56:37
 * @FilePath: \e-class-admin\src\service\api\login\login.ts
 * @Description:
 */
/*
 * @Author: ZHENG
 * @Date: 2022-04-25 11:13:15
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-04-28 15:18:24
 * @FilePath: \index\src\service\api\login\login.ts
 * @Description:
 */
// request,
import { paramsToQuery } from '@/utils';
import { request } from '../../../request';
import * as T from './types';

/** 获取课程信息 */
export function searchCouserInfo(params: T.searchCouserInfoParams) {
  const query = paramsToQuery(params);
  const res = request.get<T.couserInfoList>(`/listCourse${query}`);
  return res;
}

export function getClassList() {
  const res = request.get(`/class/getList`);
  return res;
}

export function updateCourseInfo(params) {
  const res = request.put(`/updateCourseInfo`, params);
  return res;
}

export function uploadIMage(params) {
  const res = request.post(`/uploadIMage`, params);
  return res;
}

export function uploadOutline(params) {
  const res = request.post(`/uploadOutline`, params);
  return res;
}

export function addCourse(params) {
  const res = request.post(`/addCourse`, params);
  return res;
}

export function updateCourseStatusAuto(params) {
  const res = request.put(`/updateCourseStatusAuto`, params);
  return res;
}

export function deleteCourse(params) {
  // const query = paramsToQuery(params);
  const res = request.delete(`/deletecourse/${params.id}`);
  return res;
}

// 上架和下架 /updateCourseStatusByCourseId/{CourseId}/{status}
export function updateCourseStatusByCourseId(params) {
  // const query = paramsToQuery(params);
  const res = request.put(`/updateCourseStatusByCourseId/${params.CourseId}/${params.status}`);
  return res;
}

// ${query}
export function getCouserInfo(params) {
  // console.log();
  // const query = paramsToQuery(params);
  // const res = request.get(`/chapter/list${query}`);
  const res = request.get(`/chapter/unit/getCourseChapterUnitListByCourseId/${params}`);
  // const res = mockRequest.get('/course/list', params);
  return res;
}

export function getCollegeLegistt() {
  const res = request.get(`/college/getList`);
  return res;
}

export function getPreview(params) {
  const query = paramsToQuery(params);
  const res = request.get(`/preview${query}`);
  return res;
}
