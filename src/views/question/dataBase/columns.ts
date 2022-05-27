/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:51:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-27 18:12:34
 * @FilePath: \work\src\views\question\dataBase\columns.ts
 * @Description:
 */
import { h } from 'vue';
import { NAvatar, NTag, NSwitch, useMessage } from 'naive-ui';
import { updateCourseStatusByCourseId } from '@/service';
import { getServiceEnv } from '@/utils';

const message = useMessage();
const result = getServiceEnv();
export const columns = [
  // {
  //   title: '序号',
  //   key: 'tableId',
  //   width: 80,
  //   render(row, index) {
  //     return h('h1', index + 1);
  //   }
  // },
  {
    title: '题库名称',
    key: 'courseName',
    width: 120
  },

  {
    title: '所属分类',
    key: 'bankName',
    width: 100
  },
  {
    title: '所属院系',
    key: 'collegeName',
    width: 150
  },
  {
    title: '绑定课程',
    key: 'courseName',
    width: 150
  },
  {
    title: '题目数',
    key: 'questionCount',
    width: 130
  },
  {
    title: '题库状态',
    key: 'statusName',
    width: 100,
    render(row: { status: number }) {
      return h(NSwitch, {
        value: row.status === 1,
        onUpdateValue: value => {
          row.status = row.status === 1 ? 0 : 1;
          const params = {
            CourseId: row.id,
            status: row.status
          };
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          updateCourse(params);
        }
      });
    }
  },
  // {
  //   title: '题库描述',
  //   key: 'bankDescribe',
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
/**
 * @author: ZHENG
 * @description: 上下架
 * @param {*} params
 * @return {*}
 */
const updateCourse = async params => {
  const courseResult = await updateCourseStatusByCourseId(params);
  console.log(courseResult, params.status);
  if (!courseResult.error) {
    window.$message?.success(`${params.status === 1 ? '上架' : '下架'}操作成功`);
  }
};
