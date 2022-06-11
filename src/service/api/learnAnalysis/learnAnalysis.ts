/*
 * @Author: ZHENG
 * @Date: 2022-06-07 11:36:22
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-10 16:44:16
 * @FilePath: \work\src\service\api\learnAnalysis\learnAnalysis.ts
 * @Description:
 */
import { paramsToQuery } from '@/utils';
import { request } from '../../request';

/** 获取课程信息 */
export function getTestReportGrade(unitId,classId) {
  const res = request.get(`/testReport/testReportGrade/${unitId}/${classId}`);
  return res;
}

/** 获取学生信息 */
export function getStudentList(params) {
  const query = paramsToQuery(params);
  const res = request.get(`/testReport/getStudentList/${query}`);
  return res;
}

/**
 * @author: ZHENG
 * @description: 学生成绩查询
 * @param {*} courseId
 * @param {*} studentId
 * @return {*}
 */
export function getTestStudentReportGrade(courseId,studentId){
	const res = request.get(`/testReport/testStudentReportGrade/${courseId}/${studentId}`);
  return res;
}


export function getPersonTestpersonalInfo(params){
	const query = paramsToQuery(params);
	// /testReport/testReportGrade/{unitId}/{classId}
  const res = request.get(`/testReport/personalInfo/${query}`);
  return res;

}

