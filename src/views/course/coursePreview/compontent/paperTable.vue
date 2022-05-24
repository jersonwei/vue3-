<!--
 * @Author: ZHENG
 * @Date: 2022-05-14 20:26:00
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-16 15:45:02
 * @FilePath: \work\src\views\course\coursePreview\compontent\paper.vue
 * @Description:
-->
<template>
  <TablePro
    ref="actionPaperRef"
    :columns="columns"
    :request="loadPaperDataTable"
    :row-key="row => row.id"
    :scroll-x="1200"
  >
  </TablePro>
</template>
<script lang="ts" setup>
import { getUnitPracticeList } from '@/service';
import { TablePro } from '@/components/TablePro';
import { columns } from '../columns';

const loadPaperDataTable = async (res: any) => {
  const Param = {
    unitId: courseData.value.id,
    pageSize: res.size,
    current: res.current
  };
  const result = await getUnitPracticeList({ ...Param });
  console.log(result);
  return result.data;
};
</script>
