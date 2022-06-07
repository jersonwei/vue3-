/*
 * @Author: ZHENG
 * @Date: 2022-06-07 11:36:22
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-07 11:38:27
 * @FilePath: \work\src\service\api\learnAnalysis\learnAnalysis.ts
 * @Description:
 */
import { paramsToQuery } from '@/utils';
import { request } from '../../request';

/** 获取课程信息 */
export function getTestReportGrade(params) {
  // const res = request.get('/searchCouserInfo', params);/${id}
  // const query = paramsToQuery(params);
  const res = request.get(`/testReport/testReportGrade/${params}`);
  return res;
}
