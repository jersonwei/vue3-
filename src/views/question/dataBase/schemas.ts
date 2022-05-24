/*
 * @Author: ZHENG
 * @Date: 2022-05-12 17:48:09
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-23 08:38:42
 * @FilePath: \work\src\views\question\dataBase\schemas.ts
 * @Description:
 */

export const schemas = [
  {
    field: 'courseName',
    component: 'NInput',
    label: '题库名称',
    componentProps: {
      placeholder: '请输入题库名称'
    }
  },
  {
    field: 'courseCategory',
    label: '题库分类',
    slot: 'courseCategorySlot'
  },
  {
    field: 'status',
    component: 'NSelect',
    label: '状态',
    componentProps: {
      placeholder: '请选择题库状态',
      options: [
        {
          label: '开启',
          value: 1
        },
        {
          label: '禁用',
          value: 2
        }
      ]
    }
  }
];
