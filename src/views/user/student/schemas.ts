export const schemas = [
  {
    // 用于搜索框与table实现匹配
    field: 'userName',
    component: 'NInput',
    label: '学生姓名',
    componentProps: {
      placeholder: '请输入学生姓名'
    }
  },
  {
    field: 'stunu',
    component: 'NInput',
    label: '学号',
    componentProps: {
      placeholder: '请输入学号'
    }
  },
  {
    field: 'sex',
    label: '性别',
    slot: 'genderSlot',
    componentProps: {
      placeholder: '请选择性别'
    }
    // slot: 'courseCategorySlot'
  },
  {
    field: 'collegeId',
    label: '院系',
    slot: 'departmentIdSlot'
  },
  {
    field: 'majorId',
    label: '专业',
    slot: 'majorIdSlot'
    // auth: ['basic']
    // component: 'NCascader',
    // componentProps: {
    //   placeholder: '请选择类别',
    //   options: [],
    //   checkStrategy: 'all',
    //   showPath: true
    // }
  },
  {
    field: 'classId',
    label: '班级',
    slot: 'classIdSlot'
    // auth: ['basic']
    // component: 'NCascader',
    // componentProps: {
    //   placeholder: '请选择类别',
    //   options: [],
    //   checkStrategy: 'all',
    //   showPath: true
    // }
  }
];
