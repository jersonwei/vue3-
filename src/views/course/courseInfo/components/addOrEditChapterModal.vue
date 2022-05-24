<!--
 * @Author: ZHENG
 * @Date: 2022-05-21 09:09:42
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-23 22:14:22
 * @FilePath: \work\src\views\course\courseInfo\components\addOrEditChapterModal.vue
 * @Description:
-->
<template>
  <n-modal v-model:show="showModal" preset="dialog" :title="`${addOrEdit ? '新增' : '修改'}章节`">
    <n-form ref="formRef" label-placement="left" :label-width="120" class="py-4">
      <n-form-item label="章节标题" path="label">
        <n-input v-model:value="formParams.label" placeholder="请输入标题" />
      </n-form-item>
      <n-form-item label="描述" path="label">
        <n-input v-model:value="formParams.note" type="textarea" placeholder="请输入描述" />
      </n-form-item>
      <n-form-item path="auth" style="margin-left: 100px">
        <n-space>
          <n-button type="primary" :loading="subLoading" @click="formSubmit">保存</n-button>
        </n-space>
      </n-form-item>
    </n-form>
  </n-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMessage } from 'naive-ui';
import { useCourseStore } from '@/store';
import { addChapter, editChapter } from '@/service';
import { deafultFormParams } from '@/utils';

const addOrEdit = ref(false);
const showModal = ref(false);
const subLoading = ref(false);
const courseStore = useCourseStore();
const { coutesInfoId } = storeToRefs(courseStore);
const message = useMessage();
const formParams = reactive({
  label: '',
  note: '',
  id: 0
});
const emit = defineEmits(['reset']);

/**
 * @author: ZHENG
 * @description: 新增章节
 */
const showAddModal = () => {
  deafultFormParams(formParams);
  addOrEdit.value = true;
  showModal.value = true;
};

const showEditModal = form => {
  Object.assign(formParams, form);
  addOrEdit.value = false;
  showModal.value = true;
};
/**
 * @author: ZHENG
 * @description: 新建和编辑章节，后刷新table数据
 * @return {*}
 */
const formSubmit = async () => {
  if (addOrEdit.value === true) {
    const params = {
      courseId: coutesInfoId.value,
      chapterName: formParams.label,
      note: formParams.note
    };
    const result = await addChapter(params);
    if (!result?.error?.msg) {
      message.success('新增章节成功');
    }
  } else {
    const params = {
      courseId: coutesInfoId.value,
      id: formParams.id,
      chapterName: formParams.label,
      note: formParams.note
    };
    const result = await editChapter(params);
    if (!result?.error?.msg) {
      message.success('编辑章节成功');
    }
  }
  showModal.value = false;
  emit('reset');
};

defineExpose({ showAddModal, showEditModal });
</script>
