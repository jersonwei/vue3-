/*
 * @Author: ZHENG
 * @Date: 2022-05-18 14:22:07
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-18 18:28:06
 * @FilePath: \work\src\service\api\courseMark\courseMark.ts
 * @Description:
 */

import { paramsToQuery } from '@/utils';
import { request } from '../../../request';

/** 获取课程信息 */
export function getCourseGradeVo(params) {
  // const res = request.get('/searchCouserInfo', params);/${id}
  const query = paramsToQuery(params);
  const res = request.get(`/getCourseGradeVo${query}`);
  return res;
}
