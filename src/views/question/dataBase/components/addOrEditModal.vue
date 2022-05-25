<!--
 * @Author: ZHENG
 * @Date: 2022-05-12 17:34:13
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-25 18:02:58
 * @FilePath: \work\src\views\question\dataBase\components\addOrEditModal.vue
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
    :title="`${addOrEdit ? '新增' : '修改'}题库`"
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
        <n-form-item label="题库名称" path="courseName">
          <n-input v-model:value="formParams.courseName" placeholder="请输入题库名称" />
        </n-form-item>
        <n-form-item label="所属类别" path="courseCategory">
          <n-input v-model:value="formParams.courseCategory" />
        </n-form-item>
        <n-form-item label="题库介绍" path="note">
          <n-input v-model:value="formParams.note" type="textarea" placeholder="课程介绍" />
        </n-form-item>
        <n-form-item label="绑定题目" path="courseCategory1">
          <n-input v-model:value="formParams.courseCategory" />
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
import { addQuestionBankCategory, editQuestionBankCategory } from '@/service';
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
    message: '请输入名称'
  }
};
const emits = defineEmits(['reloadTable']);
const formParams = reactive({
  id: 0,
  categoryParent: '',
  categoryParentName: '',
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
  if (!record) {
    formParams.categoryParent = '';
    formParams.categoryParentName = '无';
  } else {
    const { id, categoryName } = record;
    formParams.categoryParent = id || '';
    formParams.categoryParentName = categoryName || '无';
  }
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
  const { id, categoryName, note, categoryParent, categoryParentName } = record;
  formParams.categoryParent = categoryParent || '0';
  formParams.categoryParentName = categoryParentName || '无';
  formParams.categoryName = categoryName;
  formParams.note = note;
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
          const { categoryName, categoryParent, note } = formParams;
          const params = {
            categoryName,
            categoryParent,
            note
          };
          const result = await addQuestionBankCategory(params);
          if (!result.error) {
            message.success(`新建成功`);
          }
        } else {
          // 修改
          const { id, categoryName, categoryParent, note } = formParams;
          const params = {
            id,
            categoryName,
            categoryParent,
            note
          };
          console.log(params);
          const result = await editQuestionBankCategory(params);
          console.log(result);
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
