<!--
 * @Author: ZHENG
 * @Date: 2022-05-17 18:13:55
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-26 18:09:33
 * @FilePath: \work\src\components\wangEditor.vue
 * @Description:
-->
<template>
  <div class="h-full">
    <n-card style="width: 1600px" class="shadow-sm rounded-16px">
      <div ref="domRef" class="bg-white dark:bg-dark"></div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import WangEditor from 'wangeditor';

const editor = ref<WangEditor>();
const domRef = ref<HTMLElement>();

function setEditorConfig() {
  if (editor.value?.config?.zIndex) {
    editor.value.config.zIndex = 10;
  }
}
function renderWangEditor() {
  editor.value = new WangEditor(domRef.value);
  setEditorConfig();
  editor.value.create();
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
