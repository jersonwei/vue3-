/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:51:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-31 22:56:45
 * @FilePath: \work\src\views\test\addExam\columns.ts
 * @Description:
 */
import { h } from 'vue';
import { NTag, NSwitch, NInput } from 'naive-ui';

export const columns = [
  {
    type: 'expand',
    renderExpand: rowData => {
      return `${rowData.name} is a good guy.`;
    }
  },
  {
    title: '题目',
    key: 'questionName',
    width: 120
  },
  {
    title: '分值',
    key: 'questionScore',
    width: 120,
    render(row: { questionScore: string & [string, string] }) {
      return h(NInput, {
        value: row.questionScore,
        onUpdateValue(v) {
          // console.log(row, index);
          // eslint-disable-next-line no-param-reassign
          row.questionScore = v;
          // data.value[index].name = v;
        }
      });
    }
  },
  {
    title: '操作',
    key: 'courseName',
    width: 150
  }
];
