<!--
 * @Author: ZHENG
 * @Date: 2022-05-12 17:34:13
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-31 16:02:47
 * @FilePath: \work\src\views\test\pointManager\components\addOrEditModal.vue
 * @Description:
-->
<template>
  <n-modal
    ref="addOrEditModalRef"
    v-model:show="showModal"
    :mask-closable="false"
    style="width: 550px"
    :show-icon="false"
    preset="dialog"
    :title="`${addOrEdit ? '新增' : '修改'}分类`"
  >
    <n-scrollbar ref="scrollRef" style="max-height: 750px">
      <n-form
        ref="formRef"
        :model="formParams"
        :rules="rules"
        label-placement="left"
        :label-width="120"
        class="m-2 py-4"
      >
        <n-form-item label="分类名称" path="categoryName">
          <n-input v-model:value="formParams.categoryName" placeholder="请输入分类名称" />
        </n-form-item>
      </n-form>
    </n-scrollbar>
    <template #action>
      <n-space>
        <n-button @click="() => ((showModal = false), (showForm = null))">取消</n-button>
        <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useMessage } from 'naive-ui';
import { addPointCategory, editPointCategory } from '@/service';
import { deafultFormParams } from '@/utils';

const showModal = ref(false);
const showForm = ref<boolean | null>(null);
const formBtnLoading = ref(false);
const formRef = ref();
const message = useMessage();
const addOrEdit = ref(false);

// 新增修改的Form
const rules = {
  categoryName: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入分类名称'
  }
};
const emits = defineEmits(['reloadTable']);
const formParams = reactive({
  id: 0,
  categoryName: '',
  note: ''
});
/**
 * @author: ZHENG
 * @description: 新增的弹窗,在这里会修改数据
 * @param {*} record
 * @return {*}
 */
const showAddModalFn = (record: Recordable) => {
  deafultFormParams(formParams);
  addOrEdit.value = true;
  showModal.value = true;
};
/**
 * @author: ZHENG
 * @description: 修改弹窗
 * @param {*} record
 * @return {*}
 */
const showEditModalFn = (record: Recordable) => {
  const { id, categoryName } = record;
  formParams.categoryName = categoryName;
  formParams.id = id;
  addOrEdit.value = false;
  showModal.value = true;
};

const confirmForm = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  formBtnLoading.value = true;
  formRef.value.validate((errors: any) => {
    if (!errors) {
      setTimeout(async () => {
        // 新增
        if (addOrEdit.value === true) {
          const { categoryName } = formParams;
          const params = {
            categoryName
          };
          const result = await addPointCategory(params);
          if (!result.error) {
            message.success(`新建成功`);
          }
        } else {
          // 修改
          const { id, categoryName } = formParams;
          const params = {
            id,
            categoryName
          };
          const result = await editPointCategory(params);
          if (!result.error) {
            message.success(`编辑成功`);
          }
        }
        emits('reloadTable');
        showModal.value = false;
      });
    } else {
      message.error('请填写完整信息');
    }
    formBtnLoading.value = false;
  });
};

defineExpose({ showAddModalFn, showEditModalFn });
</script>
