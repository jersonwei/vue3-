<!--
 * @Author: ZHENG
 * @Date: 2022-05-16 15:06:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-08 09:16:43
 * @FilePath: \work\src\layouts\common\GlobalHeader\components\HeaderMenu.vue
 * @Description:
-->
<template>
  <n-menu
    :value="activeKey"
    mode="horizontal"
    :options="menus"
    :inverted="theme.header.inverted"
    @update:value="handleUpdateMenu"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import type { MenuOption } from "naive-ui";
import { useRouteStore, useThemeStore } from "@/store";
import { useRouterPush } from "@/composables";

const route = useRoute();
const routeStore = useRouteStore();
const theme = useThemeStore();
const { routerPush } = useRouterPush();

const menus = computed(() => routeStore.menus as GlobalMenuOption[]);
// const activeKey = computed(() => route.name as string);
const activeKey = computed(
  () => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string
);
function handleUpdateMenu(_key: string, item: MenuOption) {
  const menuItem = item as GlobalMenuOption;
  routerPush(menuItem.routePath);
}
</script>
<style scoped></style>
