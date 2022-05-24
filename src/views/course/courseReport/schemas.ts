/*
 * @Author: ZHENG
 * @Date: 2022-05-17 11:07:50
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-18 11:30:29
 * @FilePath: \work\src\views\course\courseReport\schemas.ts
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
    label: '学生',
    componentProps: {
      placeholder: '请选择学生'
    }
  }
];
