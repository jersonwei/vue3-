/*
 * @Author: ZHENG
 * @Date: 2022-05-02 21:57:10
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-10 14:00:47
 * @FilePath: \e-class-admin\src\components\TablePro\hooks\usePagination.ts
 * @Description:
 */
import { computed, unref, ref, ComputedRef } from 'vue';
import { isBoolean } from '@/utils';
import type { PaginationProps } from '../types/pagination';
import type { BasicTableProps } from '../types/table';
import { APISETTING, DEFAULTPAGESIZE, PAGESIZES } from '../const';

export function usePagination(refProps: ComputedRef<BasicTableProps>) {
  const configRef = ref<PaginationProps>({});
  const show = ref(true);

  const getPaginationInfo = computed((): PaginationProps | boolean => {
    const { pagination } = unref(refProps);
    if (!unref(show) || (isBoolean(pagination) && !pagination)) {
      return false;
    }
    const { totalField } = APISETTING;
    return {
      pageSize: DEFAULTPAGESIZE,
      pageSizes: PAGESIZES,
      showSizePicker: true,
      showQuickJumper: true,
      ...(isBoolean(pagination) ? {} : pagination),
      ...unref(configRef),
      pageCount: unref(configRef)[totalField]
    };
  });

  function setPagination(info: Partial<PaginationProps>) {
    const paginationInfo = unref(getPaginationInfo);
    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info
    };
  }

  function getPagination() {
    return unref(getPaginationInfo);
  }

  function getShowPagination() {
    return unref(show);
  }

  async function setShowPagination(flag: boolean) {
    show.value = flag;
  }

  return { getPagination, getPaginationInfo, setShowPagination, getShowPagination, setPagination };
}
