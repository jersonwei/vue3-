<template>
  <n-card>
    <div>试卷</div>
  </n-card>
</template>

<script setup lang="ts">
import { getPaperListInfo } from "@/service";
const params = {
  courseId: 1,
  classId: 1,
  pageNo: 2,
  pageSize: 10,
};
const result = await getPaperListInfo(params.courseId);
console.log(result);
</script>

<style></style>
