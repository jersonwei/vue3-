/*
 * @Author: ZHENG
 * @Date: 2022-05-23 09:52:31
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-23 13:39:08
 * @FilePath: \work\src\views\course\courseMgt\getOptions.ts
 * @Description:
 */
import { CascaderOption } from 'naive-ui';
import { getClassList, getCollegeLegistt, getcourseCategoryList, getCourseStatus, getLabels } from '@/service';

/**
 * @author: ZHENG
 * @description: 获取分类下拉
 * @return {*}
 */
export async function getCourseCategoryOptions() {
  const { data: result } = await getcourseCategoryList();
  const courseCategory = result.map((item: { id: number; categoryName: string }) => {
    return { value: item.id, label: item.categoryName };
  });
  return courseCategory;
}
/**
 * @author: ZHENG
 * @description: 获取院系下拉
 * @return {*}
 */
export async function getCollegeLegistOptions() {
  const { data: collegeList } = await getCollegeLegistt();
  const newcollegeList = collegeList.map((item: { id: number; collegeName: string }) => {
    return { value: item.id, label: item.collegeName, depth: 1, isLeaf: false };
  });
  return newcollegeList;
}
/**
 * @author: ZHENG
 * @description: 获取状态下拉
 * @return {*}
 */
export async function getStatusOptions() {
  const { data: courseStatusList } = await getCourseStatus(22);
  const newCourseStatusList = courseStatusList.map((item: { value: number; label: string }) => {
    return { value: item.value, label: item.label, depth: 1, isLeaf: false };
  });
  return newCourseStatusList;
}
/**
 * @author: ZHENG
 * @description: 级联的下级
 * @param {CascaderOption} option
 * @return {*}
 */
export async function getChildren(option: CascaderOption) {
  const { data: result } = await getClassList();
  const newList = result.map(item => {
    return { value: item.id, label: item.className, isLeaf: 1 };
  });
  for (let i = 0; i <= (option as { depth: number }).depth; ++i) {
    option.children = newList;
  }
  return children;
}
/**
 * @author: ZHENG
 * @description: 班级下拉框
 * @param
 * @return {*}
 */
export async function getClassListOptions() {
  const { data: majorList } = await getClassList();
  const newMajorList = majorList.map(item => {
    return { value: item.id, label: item.className };
  });
  return newMajorList;
}

export async function getLabelsOptions() {
  const { data: labelResult } = await getLabels();
  const newLabelList = labelResult.map((item: { id: any; labelName: any }) => {
    return { value: item.id, label: item.labelName, depth: 1, isLeaf: false };
  });
  return newLabelList;
}
