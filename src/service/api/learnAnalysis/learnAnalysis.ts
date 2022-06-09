/*
 * @Author: ZHENG
 * @Date: 2022-06-07 11:36:22
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-09 08:34:05
 * @FilePath: \work\src\service\api\learnAnalysis\learnAnalysis.ts
 * @Description:
 */
import { paramsToQuery } from '@/utils';
import { request } from '../../request';

/** 获取课程信息 */
export function getTestReportGrade(unitId,classId) {
  // const res = request.get('/searchCouserInfo', params);/${id}
  // const query = paramsToQuery(params);
	// /testReport/testReportGrade/{unitId}/{classId}
  const res = request.get(`/testReport/testReportGrade/${unitId}/${classId}`);
  return res;
}
