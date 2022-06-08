<!--
 * @Author: ZHENG
 * @Date: 2022-06-08 18:04:10
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-08 18:30:04
 * @FilePath: \work\src\views\course\courseInfo\components\changeSort.vue
 * @Description:
-->
<template>
  <n-modal v-model:show="showModal" preset="dialog" :show-icon="false" title="排序">
    <n-input-group>
      <n-input-group-label
        >将{{ data.type === 1 ? "章节" : "课时" }}移动到第</n-input-group-label
      >
      <n-input-number v-model:value="form.shortId" :style="{ width: '50%' }" />
      <n-input-group-label>位</n-input-group-label>
    </n-input-group>
    <template #action>
      <n-space>
        <n-button @click="() => (showModal = false)">取消</n-button>
        <n-button type="primary" :loading="subLoading" @click="formSubmit">保存</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";

import { useMessage } from "naive-ui";
import { addChapter, editChapter } from "@/service";

const showModal = ref(false);
const subLoading = ref(false);

const message = useMessage();

const emit = defineEmits(["reset"]);

/**
 * @author: ZHENG
 * @description: 新增章节
 */
const form = reactive({
  shortId: 0,
});
const data = ref();
const showChangeSortModal = (record: Recordable) => {
  data.value = record;
  showModal.value = true;
  form.shortId = record.shortId;
  showModal.value = true;
};
/**
 * @author: ZHENG
 * @description: 新建和编辑章节，后刷新table数据
 * @return {*}
 */
const formRef = ref();
const formSubmit = async () => {
  message.success("变更顺序");
  // subLoading.value = true;
  // formRef.value.validate(async (errors: any) => {
  //   if (!errors) {
  //     if (addOrEdit.value === true) {
  //       const params = {
  //         courseId: coutesInfoId.value,
  //         chapterName: formParams.label,
  //         note: formParams.note,
  //       };
  //       const result = await addChapter(params);
  //       if (!result?.error?.msg) {
  //         message.success("新增章节成功");
  //       }
  //     } else {
  //       const params = {
  //         courseId: coutesInfoId.value,
  //         id: formParams.id,
  //         chapterName: formParams.label,
  //         note: formParams.note,
  //       };
  //       const result = await editChapter(params);
  //       if (!result?.error?.msg) {
  //         message.success("编辑章节成功");
  //       }
  //     }
  //     showModal.value = false;
  //     emit("reset");
  //   } else {
  //     message.error("请填写完整信息");
  //   }
  // });
  // subLoading.value = false;
};

defineExpose({ showChangeSortModal });
</script>
