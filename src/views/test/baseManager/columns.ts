/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:51:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-31 17:31:35
 * @FilePath: \work\src\views\test\baseManager\columns.ts
 * @Description:
 */
import { h } from 'vue';
import { NSwitch } from 'naive-ui';
import { editQuestionBankStatus } from '@/service';

export const columns = [
  {
    title: '题库名称',
    key: 'bankName',
    width: 120
  },
  {
    title: '所属分类',
    key: 'categoryName',
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
    title: '创建人',
    key: 'createrName',
    width: 100
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 200
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
          console.log(row);
          const params = {
            id: row.id,
            status: row.status
          };
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          updateBankStatus(params);
        }
      });
    }
  }
];
/**
 * @author: ZHENG
 * @description: 上下架
 * @param {*} params
 * @return {*}
 */
const updateBankStatus = async params => {
  const bankResult = await editQuestionBankStatus(params);
  console.log(bankResult, params.status);
  if (!bankResult.error) {
    window.$message?.success(`${params.status === 1 ? '启用' : '禁用'}操作成功`);
  }
};
