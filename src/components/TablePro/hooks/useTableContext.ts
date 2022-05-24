/*
 * @Author: ZHENG
 * @Date: 2022-05-04 10:28:19
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-04 10:34:51
 * @FilePath: \e-class-admin\src\components\TablePro\hooks\useTableContext.ts
 * @Description:
 */
import type { Ref } from 'vue';
import { provide, inject, ComputedRef } from 'vue';
import type { BasicTableProps, TableActionType } from '../types/table';

const key = Symbol('s-table');

type Instance = TableActionType & {
  wrapRef: Ref<Nullable<HTMLElement>>;
  getBindValues: ComputedRef<Recordable>;
};

type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<BasicTableProps>;
};

export function createTableContext(instance: Instance) {
  provide(key, instance);
}

export function useTableContext(): RetInstance {
  return inject(key) as RetInstance;
}
