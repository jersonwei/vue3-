import { getCourseStatus, getPaperClassListInfo } from '@/service';

/*
 * @Author: ZHENG
 * @Date: 2022-06-03 21:18:01
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-03 21:27:14
 * @FilePath: \work\src\views\test\addExam\geOptions.ts
 * @Description:
 */
export async function getPaperClassInfo() {
  const { data: result } = await getPaperClassListInfo();
  const newResult = result.map(item => {
    return { value: item.id, label: item.categoryName };
  });
  return newResult;
}

export async function getDictionary(param) {
  const { data: result } = await getCourseStatus(param);
  return result;
}
