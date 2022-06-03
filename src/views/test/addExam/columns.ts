/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:51:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-03 23:02:21
 * @FilePath: \work\src\views\test\addExam\columns.ts
 * @Description:
 */
import { h } from 'vue';
import { NTag, NSwitch, NInput, NButton, NInputNumber } from 'naive-ui';

export const columns = [
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
      return h(NInputNumber, {
        value: row.questionScore,
        onUpdateValue(v) {
          // console.log(row, index);
          // eslint-disable-next-line no-param-reassign
          row.questionScore = v;
          console.log(row.questionScore);
          // data.value[index].name = v;
        }
      });
    }
  },
  {
    title: '操作',
    key: 'courseName',
    width: 100,
    render(row) {
      return h('div', [
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => {
              console.log(123);
            }
          },
          { default: () => '详情' }
        ),
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => {
              console.log(123);
            }
          },
          { default: () => '排序' }
        ),
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => {
              console.log(123);
            }
          },
          { default: () => '移除' }
        )
      ]);
    }
  }
];
