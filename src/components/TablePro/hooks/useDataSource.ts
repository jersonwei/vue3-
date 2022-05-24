/*
 * @Author: ZHENG
 * @Date: 2022-05-02 21:58:14
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-18 09:49:47
 * @FilePath: \work\src\components\TablePro\hooks\useDataSource.ts
 * @Description:
 */
import { ref, ComputedRef, unref, computed, onMounted, watchEffect, watch } from 'vue';
import { isBoolean } from '@/utils';
import type { BasicTableProps } from '../types/table';
import type { PaginationProps } from '../types/pagination';
import { APISETTING } from '../const';

export function useDataSource(
  propsRef: ComputedRef<BasicTableProps>,
  { getPaginationInfo, setPagination, setLoading, tableData },
  emit
) {
  const dataSourceRef = ref<Recordable[]>([]);

  watchEffect(() => {
    // eslint-disable-next-line no-param-reassign
    tableData.value = unref(dataSourceRef);
  });

  watch(
    () => unref(propsRef).dataSource,
    () => {
      const { dataSource }: any = unref(propsRef);
      // eslint-disable-next-line no-unused-expressions
      dataSource && (dataSourceRef.value = dataSource);
    },
    {
      immediate: true
    }
  );

  const getRowKey = computed(() => {
    const { rowKey }: any = unref(propsRef);
    return (
      rowKey ||
      (() => {
        return 'key';
      })
    );
  });

  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef);
    if (!dataSource || dataSource.length === 0) {
      return unref(dataSourceRef);
    }
    return unref(dataSourceRef);
  });

  async function fetch(opt?: { [x: string]: any } | undefined) {
    try {
      setLoading(true);
      const { request, pagination }: any = unref(propsRef);
      if (!request) return;
      // 组装分页信息
      const { pageField } = APISETTING;
      const { sizeField } = APISETTING;
      const { totalField } = APISETTING;
      const { listField } = APISETTING;

      let pageParams = {};
      const { page = 1, pageSize = 10 } = unref(getPaginationInfo) as PaginationProps;

      if ((isBoolean(pagination) && !pagination) || isBoolean(getPaginationInfo)) {
        pageParams = {};
      } else {
        pageParams[pageField] = (opt && opt[pageField]) || page;
        pageParams[sizeField] = pageSize;
      }

      const params = {
        ...pageParams
      };
      const res = await request(params);
      const resultTotal = res[totalField] || 0;
      const currentPage = res[pageField];

      // 如果数据异常，需获取正确的页码再次执行
      if (resultTotal) {
        if (page > resultTotal) {
          setPagination({
            [pageField]: resultTotal
          });
          fetch(opt);
        }
      }
      const resultInfo = res[listField] ? res[listField] : [];

      dataSourceRef.value = resultInfo;
      setPagination({
        [pageField]: currentPage,
        [totalField]: resultTotal
      });
      if (opt && opt[pageField]) {
        setPagination({
          [pageField]: opt[pageField] || 1
        });
      }
      emit('fetch-success', {
        items: unref(resultInfo),
        resultTotal
      });
    } catch (error) {
      console.error(error);
      emit('fetch-error', error);
      dataSourceRef.value = [];
      // setPagination({
      //   pageCount: 0,
      // });
    } finally {
      setLoading(false);
    }
  }

  onMounted(() => {
    setTimeout(() => {
      fetch();
    }, 16);
  });

  function setTableData(values) {
    dataSourceRef.value = values;
  }

  function getDataSource(): any[] {
    return getDataSourceRef.value;
  }

  async function reload(opt?) {
    await fetch(opt);
  }

  return {
    fetch,
    getRowKey,
    getDataSourceRef,
    getDataSource,
    setTableData,
    reload
  };
}
