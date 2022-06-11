<template>
  <n-grid>
    <n-gi>
      <span>{{ res }}</span>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
// import { ref } from "vue";
import { getNotesShowInfo } from "@/service";
// import { TablePro } from "@/components/TablePro";
// const formData = ref();
const res = getNotesShowInfo({
  chapterId: 1,
  current: 5,
  pageSize: 20,
});
console.log(res);
</script>

<style></style>
