/*
 * @Author: ZHENG
 * @Date: 2022-05-12 17:48:09
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-07 17:42:07
 * @FilePath: \work\src\views\course\courseMgt\schemas.ts
 * @Description:
 */

export const schemas = [
  {
    field: 'courseName',
    component: 'NInput',
    label: '课程名称',
    componentProps: {
      placeholder: '请输入课程名称'
    }
  },
  {
    field: 'courseCategory',
    label: '课程类别',
    slot: 'courseCategorySlot'
  },
  // {
  //   field: 'majorId',
  //   label: '所属专业',
  //   slot: 'majorIdSlot',
  //   auth: ['basic']
  // },
  // {
  //   field: 'status',
  //   label: '课程状态',
  //   slot: 'statusSlot'
  // }
];
