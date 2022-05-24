/*
 * @Author: ZHENG
 * @Date: 2022-05-12 17:48:09
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-23 11:30:40
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
    label: '所属类别',
    slot: 'courseCategorySlot'
  },
  {
    field: 'majorId',
    label: '所属专业',
    slot: 'majorIdSlot',
    auth: ['basic']
    // component: 'NCascader',
    // componentProps: {
    //   placeholder: '请选择类别',
    //   options: [],
    //   checkStrategy: 'all',
    //   showPath: true
    // }
  },
  {
    field: 'status',
    // component: 'NSelect',
    label: '状态',
    slot: 'statusSlot'
    // componentProps: {
    //   placeholder: '请选择课程状态',
    //   options: [
    //     {
    //       label: '上架',
    //       value: 1
    //     },
    //     {
    //       label: '定时',
    //       value: 2
    //     },
    //     {
    //       label: '下架',
    //       value: 3
    //     }
    //   ]
    // }
  }
];
