/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:51:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-23 09:23:47
 * @FilePath: \work\src\views\question\problemsList\columns.ts
 * @Description:
 */
import { h } from 'vue';
import { NAvatar, NTag, NSwitch, useMessage } from 'naive-ui';
import { updateCourseStatusByCourseId } from '@/service';
import { getServiceEnv } from '@/utils';

const message = useMessage();
const result = getServiceEnv();
export const columns = [
  {
    title: '序号',
    key: 'tableId',
    width: 80,
    render(row, index) {
      return h('h1', index + 1);
    }
  },
  {
    title: '题目名称',
    key: 'courseName',
    width: 120
  },
  {
    title: '题目分类',
    key: 'courseCategoryName',
    width: 100
  },
  {
    title: '所属题库',
    key: 'courseCategoryName',
    width: 100
  },
  {
    title: '难易度',
    key: 'courseCategoryName',
    width: 100,
    render(row: { listLabelName: any[] }) {
      const tags = row.listLabelName.map(tagKey => {
        return h(
          NTag,
          {
            style: {
              marginRight: '6px'
            },
            type: 'info'
          },
          {
            default: () => tagKey
          }
        );
      });
      return tags;
    }
  },
  {
    title: '知识点',
    key: 'courseCategoryName',
    width: 100
  },
  {
    title: '被引用次数',
    key: 'unitNum',
    width: 130
  },
  {
    title: '作答次数',
    key: 'unitNum',
    width: 130
  },
  {
    title: '状态',
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
  {
    title: '题目描述',
    key: 'note',
    width: 130
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
