/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:51:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-07 11:33:47
 * @FilePath: \work\src\views\course\courseMgt\columns.ts
 * @Description:
 */
import { h, ref } from 'vue';
import { NTag, NSwitch, NAvatar } from 'naive-ui';
import { updateCourseStatusByCourseId } from '@/service';
import { format } from 'date-fns';

export const columns = [
  {
    title: '课程名称',
    key: 'courseName',
    width: 20
  },

  {
    title: '课程类别',
    key: 'courseCategoryName',
    width: 10
  },
  {
    title: '章节数',
    key: 'chapterNum',
    width: 10
  },
  {
    title: '课时数',
    key: 'unitNum',
    width: 10
  },
  {
    title: '主讲老师',
    key: 'lecturerName',
    width: 10
  },
  // {
  //   title: '课程描述',
  //   key: 'note',
  //   width: 130
  // },
]
