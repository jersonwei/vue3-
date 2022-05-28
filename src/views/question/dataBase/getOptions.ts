import { CascaderOption } from 'naive-ui';
import { getQuestionBankCategory, getTeacherCourse } from '@/service';

/*
 * @Author: ZHENG
 * @Date: 2022-05-28 08:37:50
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-28 15:00:31
 * @FilePath: \work\src\views\question\dataBase\getOptions.ts
 * @Description:
 */
export async function getCategoryName() {
  const { data: result } = await getQuestionBankCategory('');
  const courseCategory = result.map((item: { value: string; label: string }) => {
    return { value: item.id, label: item.categoryName, categoryParent: item.categoryParent, depth: 1, isLeaf: false };
  });
  console.log(result);
  return courseCategory;
}
export async function getChildren(option: CascaderOption) {
  const param = {
    id: option.value,
    categoryParent: option.value
  };
  const { data: result } = await getQuestionBankCategory(param);
  const newList = result.map(item => {
    return { value: item.id, label: item.categoryName, isLeaf: 1 };
  });
  for (let i = 0; i <= (option as { depth: number }).depth; ++i) {
    option.children = newList;
  }
  // return children;
}
export async function getTeacherCourseList() {
  const { data: result } = await getTeacherCourse();
  const newResult = result.map(item => {
    return { value: item.id, label: item.courseName };
  });
  return newResult;
}
