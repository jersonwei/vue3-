import { CascaderOption } from 'naive-ui';
import { getClassList, getMajorList, getCollegeLegistt } from '@/service';

// //  获取分类下拉
// export async function getCourseCategoryOptions() {
//   const { data: result } = await getcourseCategoryList();
//   const courseCategory = result.map((item: { id: number; categoryName: string }) => {
//     return { value: item.id, label: item.categoryName };
//   });
//   return courseCategory;
// }
// 获取院系下拉
export async function getCollegeLegistOptions() {
  const { data: collegeList } = await getCollegeLegistt();
  const newcollegeList = collegeList.map((item: { id: number; collegeName: string }) => {
    return { value: item.id, label: item.collegeName, depth: 1, isLeaf: false };
  });
  return newcollegeList;
}
// 专业下拉框
export async function getMajorListOptions() {
  const { data: res } = await getMajorList();
  const newMajorList = res.map(item => {
    return { value: item.id, label: item.majorName };
  });
  return newMajorList;
}
// 班级下拉框
export async function getClassListOptions() {
  const { data: majorList } = await getClassList();
  const newMajorList = majorList.map(item => {
    return { value: item.id, label: item.className };
  });
  return newMajorList;
}

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
// export async function getLabelsOptions() {
//   const { data: labelResult } = await getLabels();
//   const newLabelList = labelResult.map((item: { id: any; labelName: any }) => {
//     return { value: item.id, label: item.labelName, depth: 1, isLeaf: false };
//   });
//   return newLabelList;
// }
