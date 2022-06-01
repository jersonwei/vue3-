/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:51:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-01 15:13:46
 * @FilePath: \work\src\views\test\examManager\columns.ts
 * @Description:
 */
import { h } from 'vue';
import { NTag, NSwitch } from 'naive-ui';
import { updateCourseStatusByCourseId } from '@/service';

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
    title: '试卷名称',
    key: 'paperName',
    width: 120
  },
  {
    title: '所属分类',
    key: 'categoryName',
    width: 80
  },
  {
    title: '所属院系',
    key: 'collegeName',
    width: 80
  },
  {
    title: '绑定课程',
    key: 'courseName',
    width: 80
  },
  {
    title: '题目数量',
    key: 'questionCount',
    width: 80
  },
  {
    title: '考试开始时间',
    key: 'paperBeginTime',
    width: 120
  },
  {
    title: '考试结束时间',
    key: 'paperEndTime',
    width: 120
  },
  {
    title: '试卷状态',
    key: 'status',
    width: 100,
    render(row: { status: number }) {
      return h(NSwitch, {
        value: row.status === 1,
        onUpdateValue: async value => {
          row.status = row.status === 1 ? 0 : 1;
          const params = {
            CourseId: row.id,
            status: row.status
          };
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          const result = await updateCourse(params);
        }
      });
    }
  },
  {
    title: '创建人',
    key: 'createrName',
    width: 80
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 150
  }
];
/**
 * @author: ZHENG
 * @description: 上下架
 * @param {*} params
 * @return {*}
 */
const updateCourse = async params => {
  const courseResult = await updateCourseStatusByCourseId(params);
  if (!courseResult.error) {
    window.$message?.success(`${params.status === 1 ? '上架' : '下架'}操作成功`);
    return true;
  }
  return false;
};
