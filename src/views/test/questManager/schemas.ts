/*
 * @Author: ZHENG
 * @Date: 2022-05-12 17:48:09
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-31 17:55:22
 * @FilePath: \work\src\views\test\questManager\schemas.ts
 * @Description:
 */

export const schemas = [
  {
    field: 'questionName',
    component: 'NInput',
    label: '题目名称',
    componentProps: {
      placeholder: '请输入题库名称'
    }
  },
  {
    field: 'questionType',
    label: '题目类型',
    slot: 'courseCategorySlot'
  },
  {
    field: 'difficultLevel',
    label: '难易度',
    slot: 'difficultySlot'
  }
  // {
  //   field: 'status',
  //   component: 'NSelect',
  //   label: '知识点',
  //   componentProps: {
  //     placeholder: '请选择难易度',
  //     options: [
  //       {
  //         label: '开启',
  //         value: 1
  //       },
  //       {
  //         label: '禁用',
  //         value: 2
  //       }
  //     ]
  //   }
  // }
  // {
  //   field: 'status',
  //   component: 'NSelect',
  //   label: '所属题库',
  //   componentProps: {
  //     placeholder: '请选择难易度',
  //     options: [
  //       {
  //         label: '开启',
  //         value: 1
  //       },
  //       {
  //         label: '禁用',
  //         value: 2
  //       }
  //     ]
  //   }
  // },
  // {
  //   field: 'status',
  //   component: 'NSelect',
  //   label: '状态',
  //   componentProps: {
  //     placeholder: '请选择知识点状态',
  //     options: [
  //       {
  //         label: '开启',
  //         value: 1
  //       },
  //       {
  //         label: '禁用',
  //         value: 2
  //       }
  //     ]
  //   }
  // }
];
