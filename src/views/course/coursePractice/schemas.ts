/*
 * @Author: ZHENG
 * @Date: 2022-05-17 11:14:38
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-18 14:12:51
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
    field: 'status',
    component: 'NInput',
    label: '学生',
    componentProps: {
      placeholder: '请选择学生'
    }
  }
];
