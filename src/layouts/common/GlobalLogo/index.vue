<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-04-30 14:27:50
 * @FilePath: \admin\src\layouts\common\GlobalLogo\index.vue
 * @Description:
-->
<template>
  <router-link :to="routeHomePath" class="flex-center w-full nowrap-hidden">
    <n-image width="100" src="http://rongqin.com/images/logo.png" preview-disabled />
    <h2 v-show="showTitle" class="pl-8px text-16px font-bold text-primary transition duration-300 ease-in-out">
      {{ title }}
    </h2>
  </router-link>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { routePath } from '@/router';
import { useAppInfo } from '@/composables';

interface Props {
  /** 显示名字 */
  showTitle: boolean;
}

defineProps<Props>();

const { title } = useAppInfo();
const routeHomePath = routePath('root');
</script>
<style scoped></style>
