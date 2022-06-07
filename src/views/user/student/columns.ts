import { h } from 'vue';
// import { NTag, NSwitch } from 'naive-ui';

export const columns = [
  {
    title: '序号',
    key: 'tableId',
    width: 50,
    render(row, index) {
      return h('h1', index + 1);
    }
  },
  {
    title: '姓名',
    key: 'userName',
    width: 80
  },

  {
    title: '性别',
    key: 'sexName',
    width: 50
  },
  {
    title: '学号',
    key: 'stunu',
    width: 80
  },
  {
    title: '院系',
    key: 'collegeName',
    width: 100
  },
  {
    title: '专业',
    key: 'majorName',
    width: 120
  },
  {
    title: '班级',
    key: 'className',
    width: 100
  },
  {
    title: '入学时间',
    key: 'startTime',
    width: 80
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 150
  }
];
