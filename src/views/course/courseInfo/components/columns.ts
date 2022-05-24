import { h } from 'vue';
import { NInput } from 'naive-ui';

/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:51:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-24 18:49:35
 * @FilePath: \work\src\views\course\courseInfo\components\columns.ts
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
    title: '知识点',
    key: 'questionName',
    width: 20
  },
  {
    title: '难易度',
    key: 'questionName',
    width: 20
  }
];

export const paperColumns = [
  {
    type: 'selection',
    width: 10
  },
  {
    title: 'id',
    key: 'id',
    width: 30
  },
  {
    title: '试题类型',
    key: 'questionTypeName',
    width: 200
  },
  {
    title: '试题题干',
    key: 'questionName',
    width: 200
  },
  {
    title: '知识点',
    key: 'questionName',
    width: 50
  }
];
