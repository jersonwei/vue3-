/*
 * @Author: ZHENG
 * @Date: 2022-05-12 17:48:09
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-23 09:07:04
 * @FilePath: \work\src\views\question\Knowledge\schemas.ts
 * @Description:
 */

export const schemas = [
  {
    field: 'courseName',
    component: 'NInput',
    label: '知识点名称',
    componentProps: {
      placeholder: '请输入题库名称'
    }
  },
  {
    field: 'courseCategory',
    label: '知识点分类',
    slot: 'courseCategorySlot'
  },
  {
    field: 'status',
    component: 'NSelect',
    label: '状态',
    componentProps: {
      placeholder: '请选择知识点状态',
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
