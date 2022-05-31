/*
 * @Author: ZHENG
 * @Date: 2022-05-12 17:48:09
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-25 16:35:40
 * @FilePath: \work\src\views\examination\examinationList\schemas.ts
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
    field: 'majorId',
    label: '所属课程',
    slot: 'majorIdSlot',
    auth: ['basic']
    // component: 'NCascader',
    // componentProps: {
    //   placeholder: '请选择类别',
    //   options: [],
    //   checkStrategy: 'all',
    //   showPath: true
    // }
  }
];
