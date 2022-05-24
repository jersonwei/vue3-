/*
 * @Author: ZHENG
 * @Date: 2022-05-18 10:38:29
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-18 18:33:03
 * @FilePath: \work\src\service\api\testReport\testReport.ts
 * @Description:
 */

import { request } from '../../request';

export function getTestReportList(Param) {
  const res = request.post('/testReport/listPageByUnitId', Param);
  return res;
}

export function editTestReport(Param) {
  const res = request.put('/testReport/editTeacher', Param);
  return res;
}
