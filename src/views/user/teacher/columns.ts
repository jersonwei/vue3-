/*
 * @Author: ZHENG
 * @Date: 2022-06-10 10:55:40
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-10 11:59:44
 * @FilePath: \work\src\views\user\teacher\columns.ts
 * @Description:
 */
import { h } from 'vue';
// import { NTag, NSwitch } from 'naive-ui';
import { format } from 'date-fns';
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
    title: '工号',
    key: 'teaNum',
    width: 50
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
    title: '授课班级',
    key: 'courseNames',
    width: 100
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 150,
		render(row: { createTime: string }) {
			const date = new Date(row.createTime);
			const tags = format(date, 'yyyy-MM-dd')
			return tags;
	}
  }
];
