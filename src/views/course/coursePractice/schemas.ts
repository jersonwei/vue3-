/*
 * @Author: ZHENG
 * @Date: 2022-05-17 11:14:38
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-24 11:06:57
 * @FilePath: \work\src\views\course\coursePractice\schemas.ts
 * @Description:
 */

export const schemas = [
  {
    field: 'unitId',
    label: '课时',
    // 插槽
    slot: 'unitIdSlot'
  },
  {
    field: 'stuName',
    component: 'NInput',
    label: '学生名称',
    componentProps: {
      placeholder: '请输入学生名称'
    }
  }
];
