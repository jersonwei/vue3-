/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:51:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-08 17:31:46
 * @FilePath: \work\src\views\course\courseMgt\columns.ts
 * @Description:
 */
import { h, ref } from 'vue';
import { NTag, NSwitch, NAvatar } from 'naive-ui';
import { updateCourseStatusByCourseId } from '@/service';
import { format } from 'date-fns';

export const columns = [
  {
    title: '序号',
    key: 'tableId',
    width: 30,
		fixed: "left",
    render(row, index) {
      return h('h1', index + 1);
    }
  },
  {
    title: '课程名称',
		fixed: "left",
    key: 'courseName',
    width: 30
  },
	{
    title: '课程类别',
    key: 'courseCategoryName',
    width: 30
  },
  {
    title: '章节数',
    key: 'chapterNum',
    width: 30
  },
  {
    title: '课时数',
    key: 'unitNum',
    width: 30
  },
  {
    title: '主讲老师',
    key: 'lecturerName',
    width: 30
  },
  // {
  //   title: '课程描述',
  //   key: 'note',
  //   width: 130
  // },
]
