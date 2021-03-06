/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
/*
 * @Author: ZHENG
 * @Date: 2022-05-02 21:49:42
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-08 16:14:02
 * @FilePath: \work\src\components\TablePro\hooks\useColumns.ts
 * @Description:
 */
import { ref, Ref, ComputedRef, unref, computed, watch, toRaw, h } from 'vue';
import { NTooltip, NIcon } from 'naive-ui';
import { isEqual, cloneDeep } from 'lodash-es';
import { FormOutlined } from '@vicons/antd';
import { usePermission } from '@/composables';
import { isArray, isString, isBoolean, isFunction } from '@/utils';
// import { usePermission } from '@/hooks/web/usePermission';
import { ActionItem } from '@/components/TablePro';
import type { BasicColumn, BasicTableProps } from '../types/table';
// import { renderEditCell } from '../components/editable';

export function useColumns(propsRef: ComputedRef<BasicTableProps>) {
  const columnsRef = ref(unref(propsRef).columns) as unknown as Ref<BasicColumn[]>;
  let cacheColumns = unref(propsRef).columns;

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef));

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    handleActionColumn(propsRef, columns);
		console.log(columns)
    if (!columns) return [];
    return columns;
  });

  // const { hasBtnPermission } = usePermission();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function isIfShow(action: ActionItem): boolean {
    const { ifShow } = action;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    let isIfShow = true;

    if (isBoolean(ifShow)) {
      isIfShow = ifShow;
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(action);
    }
    return isIfShow;
  }

  const renderTooltip = (trigger, content) => {
    return h(NTooltip, null, {
      trigger: () => trigger,
      default: () => content
    });
  };

  const getPageColumns = computed(() => {
    const pageColumns = unref(getColumnsRef);
    const columns = cloneDeep(pageColumns);

    return (
      columns
        // .filter(column => {
				// 	console.log(column,hasBtnPermission(column?.auth as string[]))
        //   return hasBtnPermission(column.auth as string[]) && isIfShow(column);
        // })
        .map(column => {
          // ?????? ellipsis ???true
          column.ellipsis = typeof column.ellipsis === 'undefined' ? { tooltip: true } : false;
          const { edit } = column;
          if (edit) {
            // column.render = renderEditCell(column);
            if (edit) {
              const { title } = column;
              column.title = () => {
                return renderTooltip(
                  h('span', {}, [
                    h('span', { style: { 'margin-right': '5px' } }, title),
                    h(
                      NIcon,
                      {
                        size: 14
                      },
                      {
                        default: () => h(FormOutlined)
                      }
                    )
                  ]),
                  '???????????????'
                );
              };
            }
          }
          return column;
        })
    );
  });

  watch(
    () => unref(propsRef).columns,
    columns => {
      columnsRef.value = columns;
      cacheColumns = columns;
    }
  );

  function handleActionColumn(propsRef: ComputedRef<BasicTableProps>, columns: BasicColumn[]) {
    const { actionColumn } = unref(propsRef);

    if (!actionColumn) return;
		// ?????????????????????render--2022-06-07 ???????????????????????????????????????
    // console.log(hasPermission());
    // if (!hasPermission()) return;
    // eslint-disable-next-line no-unused-expressions
    !columns.find(col => col.key === 'action') &&
      columns.push({
        ...(actionColumn as any)
      });
  }

  // ??????
  function setColumns(columnList: string[]) {
    const columns: any[] = cloneDeep(columnList);
    if (!isArray(columns)) return;

    if (!columns.length) {
      columnsRef.value = [];
      return;
    }
    const cacheKeys = cacheColumns.map(item => item.key);
    // ??????????????????
    if (!isString(columns[0])) {
      columnsRef.value = columns;
    } else {
      const newColumns: any[] = [];
      cacheColumns.forEach(item => {
        if (columnList.includes(item.key)) {
          newColumns.push({ ...item });
        }
      });
      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return cacheKeys.indexOf(prev.key) - cacheKeys.indexOf(next.key);
        });
      }
      columnsRef.value = newColumns;
    }
  }

  // ??????
  function getColumns(): BasicColumn[] {
    const columns = toRaw(unref(getColumnsRef));
    return columns.map(item => {
      return { ...item, title: item.title, key: item.key, fixed: item.fixed || undefined };
    });
  }

  // ????????????
  function getCacheColumns(isKey?: boolean): any[] {
    return isKey ? cacheColumns.map(item => item.key) : cacheColumns;
  }

  // ??????????????????????????????
  function setCacheColumnsField(key: string | undefined, value: Partial<BasicColumn>) {
    if (!key || !value) {
      return;
    }
    cacheColumns.forEach(item => {
      if (item.key === key) {
        Object.assign(item, value);
      }
    });
  }

  return {
    getColumnsRef,
    getCacheColumns,
    setCacheColumnsField,
    setColumns,
    getColumns,
    getPageColumns
  };
}
