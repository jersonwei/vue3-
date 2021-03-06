/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:51:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-31 17:28:54
 * @FilePath: \work\src\views\test\baseType\columns.ts
 * @Description:
 */
import { h } from 'vue';

export const columns = [
  // {
  //   title: '序号',
  //   key: 'tableId',
  //   width: 100,
  //   render(row, index) {
  //     return h('h1', index + 1);
  //   }
  // },
  {
    title: '分类名称',
    key: 'categoryName',
    width: 120,
    render(row: { children: any; categoryName: any }, index) {
      if (row.children?.length) {
        return h('h1', `${row.categoryName}(${row.children.length})`);
      }
      return h('h1', `${row.categoryName}`);
    }
  },
  {
    title: '所属院系',
    key: 'collegeName',
    width: 80
  },
  // {
  //   title: '所属专业',
  //   key: 'majorName',
  //   width: 150
  // },
  // {
  //   title: '所属课程',
  //   key: 'majorName',
  //   width: 150
  // },
  {
    title: '题库数量',
    key: 'count',
    width: 80
  },
  // {
  //   title: '分类描述',
  //   key: 'note',
  //   width: 130
  // },
  {
    title: '创建人',
    key: 'createrName',
    width: 100
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 200
  }
];
