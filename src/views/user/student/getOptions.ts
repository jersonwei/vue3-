import { CascaderOption } from 'naive-ui';
import { getClassList, getMajorList, getCollegeLegistt,getCourseStatus } from '@/service';

// //  获取分类下拉
// export async function getCourseCategoryOptions() {
//   const { data: result } = await getcourseCategoryList();
//   const courseCategory = result.map((item: { id: number; categoryName: string }) => {
//     return { value: item.id, label: item.categoryName };
//   });
//   return courseCategory;
// }

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
  const { data: classList } = await getClassList();
  const newClassList = classList.map(item => {
    return { value: item.id, label: item.className };
  });
  return newClassList;
}
// 获取子集
export async function getChildren(option: CascaderOption) {
	const param={collegeId:option.value}
  const { data: result } = await getMajorList(param);
  const newList = result.map(item => {
    return { value: `{option.value}-${item.id}`, label: item.majorName, isLeaf: 1 };
  });
	const {data :res}=await getClassList()
	const lastList=res.map(item=>{
		return {value:`{option.value}-${item.id}`,label:item.className,isLeaf:1}
	})
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

