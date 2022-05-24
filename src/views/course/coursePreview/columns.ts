import { h } from 'vue';
import { NInput } from 'naive-ui';

/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:51:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-16 15:59:00
 * @FilePath: \work\src\views\course\coursePreview\columns.ts
 * @Description:
 */
export const columns = [
  {
    title: 'id',
    key: 'id',
    width: 10
  },
  {
    title: '试题类型',
    key: 'questionTypeName',
    width: 20
  },
  {
    title: '试题题干',
    key: 'questionName',
    width: 20
  },
  {
    title: '分数',
    key: 'questionScore',
    width: 30
  }
];

export const paperColumns = [
  {
    type: 'selection'
  },
  {
    title: 'id',
    key: 'id',
    width: 30
  },
  {
    title: '试题类型',
    key: 'questionTypeName',
    width: 30
  },
  {
    title: '试题题干',
    key: 'questionName',
    width: 30
  },
  {
    title: '分数',
    key: 'questionScore',
    width: 50,
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
  }
];
