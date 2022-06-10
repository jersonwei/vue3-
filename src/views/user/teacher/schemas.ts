/*
 * @Author: ZHENG
 * @Date: 2022-06-10 10:55:40
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-10 14:00:44
 * @FilePath: \work\src\views\user\teacher\schemas.ts
 * @Description:
 */
export const schemas = [
  {
    // 用于搜索框与table实现匹配
    field: 'teacherName',
    component: 'NInput',
    label: '教师姓名',
    componentProps: {
      placeholder: '请输入教师姓名'
    }
  },
  {
    field: 'teaNum',
    component: 'NInput',
    label: '工号',
    componentProps: {
      placeholder: '请输入教师工号'
    }
  },
  {
    field: 'sex',
    label: '性别',
    slot: 'sexSlot',
    componentProps: {
      placeholder: '请选择性别',
    }
    // slot: 'courseCategorySlot'
  },
  {
    field: 'collegeId',
    label: '院系/专业',
		labelMessage: '根据院系获取专业',
    slot: 'majorIdSlot'
  },
  {
    field: 'classId',
    label: '班级',
    slot: 'classIdSlot'
  }
];
