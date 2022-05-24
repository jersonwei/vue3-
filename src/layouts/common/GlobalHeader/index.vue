<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-05 18:26:07
 * @FilePath: \e-class-admin\src\layouts\common\GlobalHeader\index.vue
 * @Description:
-->
<template>
  <dark-mode-container class="global-header flex-y-center h-full" :inverted="theme.header.inverted">
    <global-logo v-if="showLogo" :show-title="true" class="h-full" :style="{ width: theme.sider.width + 'px' }" />
    <div v-if="!showHeaderMenu" class="flex-1-hidden flex-y-center h-full">
      <menu-collapse v-if="showMenuCollapse" />
      <global-breadcrumb v-if="theme.header.crumb.visible" />
    </div>
    <div v-else class="flex-1-hidden flex-y-center h-full" :style="{ justifyContent: theme.menu.horizontalPosition }">
      <header-menu />
    </div>
    <div class="flex justify-end h-full">
      <global-search />
      <full-screen />
      <theme-mode />
      <user-avatar />
    </div>
  </dark-mode-container>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store';
import GlobalLogo from '../GlobalLogo/index.vue';
import GlobalSearch from '../GlobalSearch/index.vue';
import { MenuCollapse, GlobalBreadcrumb, HeaderMenu, FullScreen, ThemeMode, UserAvatar } from './components';

interface Props {
  /** 显示logo */
  showLogo: GlobalHeaderProps['showLogo'];
  /** 显示头部菜单 */
  showHeaderMenu: GlobalHeaderProps['showHeaderMenu'];
  /** 显示菜单折叠按钮 */
  showMenuCollapse: GlobalHeaderProps['showMenuCollapse'];
}

defineProps<Props>();

const theme = useThemeStore();
</script>
<style scoped>
.global-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
