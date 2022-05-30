/*
 * @Author: ZHENG
 * @Date: 2022-05-30 11:56:29
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-30 11:56:31
 * @FilePath: \work\src\views\question\dataBaseProblems\components\showDataBase\schemas.ts
 * @Description:
 */
/*
 * @Author: ZHENG
 * @Date: 2022-05-12 17:48:09
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-28 09:15:54
 * @FilePath: \work\src\views\question\dataBase\schemas.ts
 * @Description:
 */

export const schemas = [
  {
    field: 'bankName',
    component: 'NInput',
    label: '题库名称',
    componentProps: {
      placeholder: '请输入题库名称'
    }
  },
  {
    field: 'bankType',
    label: '题库分类',
    slot: 'categoryNameSlot'
  }
];
