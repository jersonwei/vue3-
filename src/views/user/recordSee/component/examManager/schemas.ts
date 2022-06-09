/*
 * @Author: ZHENG
 * @Date: 2022-05-12 17:48:09
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-01 15:14:13
 * @FilePath: \work\src\views\test\examManager\schemas.ts
 * @Description:
 */

export const schemas = [
  {
    field: 'courseName',
    component: 'NInput',
    label: '试卷名称',
    componentProps: {
      placeholder: '请输入试卷名称'
    }
  },
  {
    field: 'courseCategory',
    label: '试卷类别',
    slot: 'courseCategorySlot'
  }
];
