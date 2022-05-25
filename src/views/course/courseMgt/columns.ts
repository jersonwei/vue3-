/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:51:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-25 10:25:12
 * @FilePath: \work\src\views\course\courseMgt\columns.ts
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
    title: '课程名称',
    key: 'courseName',
    width: 120
  },

  {
    title: '课程类别',
    key: 'courseCategoryName',
    width: 100
  },
  {
    title: '所属院系',
    key: 'collegeName',
    width: 100
  },
  {
    title: '所属专业',
    key: 'majorName',
    width: 120
  },
  // {
  //   title: '课程图片',
  //   key: 'coverPic',
  //   width: 120,
  //   render(row: { coverPic: any }) {
  //     return h(NAvatar, {
  //       size: 48,
  //       src: result + row.coverPic,
  //       fallbackSrc:
  //         'http://120.79.129.174:8081/upload/cover/20220514145512_%E8%9E%8D%E5%8B%A4%E5%AE%9A%E7%A8%BF%E6%BA%90%E6%96%87%E4%BB%B6-02.jpg'
  //     });
  //   }
  // },
  {
    title: '所属班级',
    key: 'listClassName',
    width: 150,
    render(row: { listClassName: any[] }) {
      if (row.listClassName?.length) {
        const tags = row.listClassName?.join(',');
        return tags;
      }
      return [];
    }
  },
  {
    title: '课程标签',
    key: 'listLabelName',
    width: 150,
    render(row: { listLabelName: any[] }) {
      if (row.listLabelName?.length) {
        const tags = row.listLabelName.join(',');
        return tags;
      }
      return [];
    }
  },
  {
    title: '章节数',
    key: 'chapterNum',
    width: 80
  },
  {
    title: '课时数',
    key: 'unitNum',
    width: 80
  },
  {
    title: '课程状态',
    key: 'statusName',
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
    title: '主讲老师',
    key: 'lecturerName',
    width: 80
  },
  // {
  //   title: '课程描述',
  //   key: 'note',
  //   width: 130
  // },
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
