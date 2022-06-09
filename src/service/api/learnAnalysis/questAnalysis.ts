/*
 * @Author: ZHENG
 * @Date: 2022-06-09 08:57:46
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-09 08:57:47
 * @FilePath: \work\src\service\api\learnAnalysis\questAnalysis.ts
 * @Description:
 */
import { paramsToQuery } from '@/utils';
import { request } from '../../request';

/** 获取课程信息 */
export function getProblemAnalysis(params) {
  // const res = request.get('/searchCouserInfo', params);/${id}
  const query = paramsToQuery(params);
	// /testReport/testReportGrade/{unitId}/{classId}
  const res = request.get(`/problemAnalysis/list/${query}`);
  return res;
}
