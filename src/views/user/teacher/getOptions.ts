/*
 * @Author: ZHENG
 * @Date: 2022-06-10 10:55:40
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-10 11:34:12
 * @FilePath: \work\src\views\user\teacher\getOptions.ts
 * @Description:
 */
import { CascaderOption } from 'naive-ui';
import { getClassList, getMajorList, getCollegeLegistt, getCourseStatus } from '@/service';


// 班级下拉框
export async function getClassListOptions() {
  const { data: majorList } = await getClassList();
  const newMajorList = majorList.map(item => {
    return { value: item.id, label: item.className };
  });
  return newMajorList;
}
// 获取性别
export async function getSexOptions() {
  const { data: sexList } = await getCourseStatus(10);
  const newSexList = sexList.map((item: { value: number; label: string }) => {
    return { value: item.value, label: item.label, depth: 1, isLeaf: false };
  });
  return newSexList;
}
// 获取院系下拉
export async function getCollegeLegistOptions() {
  const { data: collegeList } = await getCollegeLegistt();
	console.log(collegeList)
  const newcollegeList = collegeList.map((item: { id: number; collegeName: string }) => {
    return { value: item.id, label: item.collegeName, depth: 1, isLeaf: false };
  });
  return newcollegeList;
}
export async function getChildren(option: CascaderOption) {
  const param = {
    collegeId: option.value
  };
  const { data: result } = await getMajorList(param);
  const newList = result.map(item => {
    return { value: `${option.value}-${item.id}`, label: item.majorName, isLeaf: 1 };
  });
  for (let i = 0; i <= (option as { depth: number }).depth; ++i) {
    option.children = newList;
  }
}

