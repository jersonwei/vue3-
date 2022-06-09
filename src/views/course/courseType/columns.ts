/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:51:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-08 15:57:38
 * @FilePath: \work\src\views\course\courseType\columns.ts
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
    title: '课程数量',
    key: 'count',
    width: 80
  },
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
