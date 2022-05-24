/*
 * @Author: ZHENG
 * @Date: 2022-05-12 17:39:10
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-20 11:10:37
 * @FilePath: \work\src\service\api\course\courseMgt\types.ts
 * @Description:
 */

export interface searchCouserInfoParams {
  pageSize: number;
  current: number;
  courseCategory?: number;
  courseName?: string;
  status?: number;
  majorId: number;
}
