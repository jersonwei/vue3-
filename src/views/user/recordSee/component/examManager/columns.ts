/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:51:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-01 15:42:37
 * @FilePath: \work\src\views\test\examManager\columns.ts
 * @Description:
 */
import { h } from 'vue';
import { NTag, NSwitch } from 'naive-ui';
import { editStatusPaper } from '@/service';

export const columns = [
  {
    title: '试卷名称',
    key: 'paperName',
    width: 120
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
    title: '考试成绩',
    key: 'createrName',
    width: 80
  },
	{
    title: '考试详情',
    key: 'createrName',
    width: 80
  }
];
const updateCourse = async params => {
  const courseResult = await editStatusPaper(params);
  if (!courseResult.error) {
    window.$message?.success(`${params.status === 1 ? '启用' : '禁用'}操作成功`);
    return true;
  }
  return false;
};
