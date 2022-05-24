<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-04 12:09:20
 * @FilePath: \e-class-admin\src\views\system-view\components\ExceptionBase.vue
 * @Description: 回到首页功能
-->
<template>
  <div class="flex-col-center wh-full">
    <div class="text-400px text-primary">
      <icon-custom-no-permission v-if="type === '403'" />
      <icon-custom-not-found v-if="type === '404'" />
      <icon-custom-service-error v-if="type === '500'" />
    </div>
    <router-link :to="{ name: routeHomePath }">
      <n-button type="primary">回到首页</n-button>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import { routeName } from '@/router';

type ExceptionType = '403' | '404' | '500';

interface Props {
  /** 异常类型 403 404 500 */
  type: ExceptionType;
}

defineProps<Props>();

const routeHomePath = routeName('root');
</script>
<style scoped></style>
