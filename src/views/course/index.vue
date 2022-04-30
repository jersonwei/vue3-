<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 14:33:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-04-30 15:52:01
 * @FilePath: \admin\src\views\course\index.vue
 * @Description:
-->
<template>
  <n-card :bordered="false">
    <BasicTable :columns="columns"> </BasicTable>
  </n-card>
</template>

<script lang="ts" setup>
import { BasicTable } from '@/components/TablePro';
import { columns } from './columns';
</script>
<style scoped></style>
