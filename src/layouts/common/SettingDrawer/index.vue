<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-05 18:25:58
 * @FilePath: \e-class-admin\src\layouts\common\SettingDrawer\index.vue
 * @Description:
-->
<template>
  <n-drawer :show="app.settingDrawerVisible" display-directive="show" :width="330" @mask-click="app.closeSettingDrawer">
    <n-drawer-content title="主题配置" :native-scrollbar="false">
      <dark-mode />
      <layout-mode />
      <theme-color-select />
      <page-func />
      <page-view />
      <theme-config />
    </n-drawer-content>
  </n-drawer>
  <!-- <drawer-button /> -->
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import { DarkMode, LayoutMode, ThemeColorSelect, PageFunc, PageView, ThemeConfig } from './components';

const app = useAppStore();
</script>
<style scoped></style>
