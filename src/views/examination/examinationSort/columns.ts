/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:51:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-25 16:20:15
 * @FilePath: \work\src\views\examination\examinationSort\columns.ts
 * @Description:
 */
import { h } from 'vue';
import { NTag, NSwitch } from 'naive-ui';

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
    title: '所属专业',
    key: 'majorName',
    width: 120
  },
  {
    title: '所属课程',
    key: 'courseName',
    width: 150
  },
  {
    title: '分类名称',
    key: 'listLabelName',
    width: 150
  },
  {
    title: '分类介绍',
    key: 'listLabelName',
    width: 150
  },
  {
    title: '试卷数量',
    key: 'unitNum',
    width: 80
  }
  // {
  //   title: '课程描述',
  //   key: 'note',
  //   width: 130
  // },
];
