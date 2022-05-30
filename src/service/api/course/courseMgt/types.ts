/*
 * @Author: ZHENG
 * @Date: 2022-05-12 17:39:10
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-30 10:53:33
 * @FilePath: \work\src\service\api\course\courseMgt\types.ts
 * @Description:
 */

export interface searchCouserInfoParams {
  pageSize: number;
  current: number;
  courseCategory?: number;
  courseName?: string;
  status?: number;
  majorId?: number;
}

export interface couserInfoList {
  records: couserInfoListRecord[];
  total: number;
  size: number;
  current: number;
  orders: any[];
  optimizeCountSql: boolean;
  searchCount: boolean;
  pages: number;
}

interface couserInfoListRecord {
  id: string;
  courseName: string;
  courseCategory: number;
  majorId: string;
  eclassId: string;
  coverPic: string;
  labelId: string;
  status: number;
  lecturer: string;
  secLecturer?: number;
  createTime: string;
  launchTime: string;
  courseOutline?: string;
  creater: string;
  note: string;
  courseCategoryName: string;
  majorName: string;
  chapterNum: number;
  unitNum: number;
  listLabelName: string[];
  listClassName: string[];
  createrName: string;
  lecturerName: string;
  statusName: string;
  collegeId: string;
  collegeName: string;
  secLecturerName?: string;
}
