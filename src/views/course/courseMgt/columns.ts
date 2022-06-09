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
    width: 50,
		fixed: "left",
    render(row, index) {
      return h('h1', index + 1);
    }
  },
  {
    title: '课程名称',
		fixed: "left",
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
    render(row: { id: number,status: number }) {
      return h(NSwitch, {
        value: row.status === 1,
        onUpdateValue: async value => {
					console.log(value)
					if(value){
						row.status = row.status === 1 ? 0 : 1;
						const params = {
							CourseId: row.id,
							status: row.status
						};
						const result = await updateCourse(params);
						if(!result){
							row.status = row.status === 1 ? 0 : 1;
						}
					}else{
						window.$dialog?.info({
							title: "提示",
							content: "下架后，学员端将不再展示该课程,确定要下架吗？",
							positiveText: "确定",
							negativeText: "取消",
							onPositiveClick: async () => {
								row.status = row.status === 1 ? 0 : 1;
								const params = {
									CourseId: row.id,
									status: row.status
								};
								const result = await updateCourse(params);
								if(!result){
									row.status = row.status === 1 ? 0 : 1;
								}
							},
						});
					}
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
    title: '创建日期',
    key: 'createTime',
    width: 100,
		render(row: { createTime: string }) {
				const date = new Date(row.createTime);
        const tags = format(date, 'yyyy-MM-dd')
        return tags;
    }
  },
	{
		title: '定时上架时间',
    key: 'launchTime',
    width: 150,
		render(row: { status: number,launchTime: string }) {
			const toDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
			const date = format(new Date(row.launchTime), 'yyyy-MM-dd HH:mm:ss')
      if(row.status === 1){
        return '';
      }
			else{
        return date;
      }

	}
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
