import { getQuestionBankCategory } from '@/service';

/*
 * @Author: ZHENG
 * @Date: 2022-05-30 11:57:53
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-30 11:59:50
 * @FilePath: \work\src\views\question\dataBaseProblems\components\showDataBase\getOptions.ts
 * @Description:
 */
export async function getCategoryName() {
  const { data: result } = await getQuestionBankCategory('');
  const courseCategory = result.map((item: { value: string; label: string }) => {
    return { value: item.id, label: item.categoryName, categoryParent: item.categoryParent, depth: 1, isLeaf: false };
  });
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
