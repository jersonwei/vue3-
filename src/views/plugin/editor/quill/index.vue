<!--
 * @Author: ZHENG
 * @Date: 2022-05-16 15:06:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-16 15:44:16
 * @FilePath: \work\src\views\plugin\editor\quill\index.vue
 * @Description:
-->
<template>
  <div class="h-full">
    <n-card title="富文本插件" class="shadow-sm rounded-16px">
      <div ref="domRef" class="bg-white dark:bg-dark"></div>
      <template #footer>
        <github-link link="https://github.com/wangeditor-team/wangEditor" />
      </template>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import WangEditor from 'wangeditor';

const editor = ref<WangEditor>();
const domRef = ref<HTMLElement>();

function renderWangEditor() {
  editor.value = new WangEditor(domRef.value);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  setEditorConfig();
  editor.value.create();
}

function setEditorConfig() {
  if (editor.value?.config?.zIndex) {
    editor.value.config.zIndex = 10;
  }
}

onMounted(() => {
  renderWangEditor();
});
</script>
<style scoped>
:deep(.w-e-toolbar) {
  background: inherit !important;
  border-color: #999 !important;
}
:deep(.w-e-text-container) {
  background: inherit;
  border-color: #999 !important;
}
</style>
