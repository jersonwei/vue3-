<!--
 * @Author: ZHENG
 * @Date: 2022-05-16 15:06:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-09 09:40:52
 * @FilePath: \work\src\layouts\common\GlobalContent\index.vue
 * @Description:
-->
<template>
  <div
    :class="{ 'p-16px': showPadding }"
    class="h-full bg-[#f6f9f8] dark:bg-[#101014] transition duration-300 ease-in-out"
  >
    <router-view v-slot="{ Component, route }">
      <transition
        :name="theme.pageAnimateMode"
        mode="out-in"
        :appear="true"
        @before-leave="handleBeforeLeave"
        @after-enter="handleAfterEnter"
      >
        <keep-alive :include="routeStore.cacheRoutes">
          <component :is="Component" v-if="app.reloadFlag" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAppStore, useThemeStore, useRouteStore } from "@/store";

interface Props {
  /** 显示padding */
  showPadding?: boolean;
}
interface Emits {
  /** 禁止主体溢出 */
  (e: "hide-main-overflow", hidden: boolean): void;
}
withDefaults(defineProps<Props>(), {
  showPadding: true,
});

const emit = defineEmits<Emits>();
function handleBeforeLeave() {
  emit("hide-main-overflow", true);
}
function handleAfterEnter() {
  emit("hide-main-overflow", false);
}
const app = useAppStore();
const theme = useThemeStore();
const routeStore = useRouteStore();
</script>
<style scoped></style>
