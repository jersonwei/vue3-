/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:54:32
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-05 18:32:39
 * @FilePath: \e-class-admin\src\components\TablePro\Props.ts
 * @Description:
 */
/*
 * @Author: ZHENG
 * @Date: 2022-04-29 09:32:34
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-01 19:56:05
 * @FilePath: \naive-ui-admin-main\src\components\Table\src\props.ts
 * @Description:
 */
import type { PropType } from 'vue';
import { NDataTable } from 'naive-ui';
import { propTypes } from '@/utils/index';
import { BasicColumn } from './types/table';

export const basicProps = {
  ...NDataTable.props, // 这里继承原 UI 组件的 props
  title: {
    type: String,
    default: null
  },
  titleTooltip: {
    type: String,
    default: null
  },
  size: {
    type: String,
    default: 'medium'
  },
  dataSource: {
    type: [Object],
    default: () => []
  },
  columns: {
    type: [Array] as PropType<BasicColumn[]>,
    default: () => [],
    required: true
  },
  request: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((record) => string)>,
    default: undefined
  },
  pagination: {
    type: [Object, Boolean],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {}
  },
  // // 废弃
  // showPagination: {
  //   type: [String, Boolean],
  //   default: 'auto'
  // },
  actionColumn: {
    type: Object as PropType<BasicColumn>,
    default: null
  },
  canResize: propTypes.bool.def(true),
  resizeHeightOffset: propTypes.number.def(0)
};
