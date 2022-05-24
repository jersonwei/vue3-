/*
 * @Author: ZHENG
 * @Date: 2022-05-02 21:36:03
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-02 21:39:10
 * @FilePath: \e-class-admin\src\components\TablePro\src\hooks\useLoading.ts
 * @Description:
 */
import { ref, ComputedRef, unref, computed, watch } from 'vue';
import type { BasicTableProps } from '../types';

export function useLoading(props: ComputedRef<BasicTableProps>) {
  const loadingRef = ref(unref(props).loading);

  watch(
    () => unref(props).loading,
    loading => {
      loadingRef.value = loading;
    }
  );

  const getLoading = computed(() => unref(loadingRef));

  function setLoading(loading: boolean) {
    loadingRef.value = loading;
  }

  return { getLoading, setLoading };
}
