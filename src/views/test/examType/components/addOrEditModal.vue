<!--
 * @Author: ZHENG
 * @Date: 2022-05-12 17:34:13
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-01 15:20:35
 * @FilePath: \work\src\views\test\examType\components\addOrEditModal.vue
 * @Description:
-->
<template>
  <n-modal
    ref="newModalRef"
    v-model:show="showModal"
    :mask-closable="false"
    style="width: 650px"
    :show-icon="false"
    preset="dialog"
    :title="`${addOrEdit ? '新建' : '编辑'}分类`"
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
        <n-form-item label="分类名称" path="courseName">
          <n-input v-model:value="formParams.courseName" placeholder="请输入分类名称" />
        </n-form-item>
        <n-form-item label="所属课程" path="courseCategory">
          <n-select v-model:value="formParams.courseCategory" :options="form.courseCategory" />
        </n-form-item>
        <n-form-item label="分类介绍" path="note">
          <n-input v-model:value="formParams.note" type="textarea" placeholder="分类介绍" />
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
import { useDebounceFn } from '@vueuse/core';
import { useAuthStore } from '@/store';
import { addExampaperclassification, getTeacherCourse } from '@/service';
import { getServiceEnv, deafultFormParams } from '@/utils';

const showModal = ref(false);
const addOrEdit = ref(false); // true 新增，false修改
const showForm = ref<boolean | null>(null); // 展示虚拟机页面
const formBtnLoading = ref(false);
const formRef = ref();
const message = useMessage();

const emits = defineEmits(['reloadTable']);
const formParams = reactive({
  courseName: '',
  courseCategory: '',
  note: ''
});
const form = reactive({
  courseCategory: []
});

const showModalFn = () => {
  deafultFormParams(formParams);
  addOrEdit.value = true;
  showModal.value = true;
};
const getList = async () => {
  const { data: result } = await getTeacherCourse();
  const newResult = result.map(item => {
    return { value: item.id, label: item.courseName };
  });
  form.courseCategory = newResult;
};
getList();

const editID = ref();
const editModalFn = record => {
  console.log(record);
  editID.value = record.id;
  const formData = {
    courseName: record.categoryName,
    courseCategory: record.courseId,
    note: record.categoryDescribe
  };
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  Object.assign(formParams, formData);
  addOrEdit.value = false;
  showModal.value = true;
};

// 新增修改的Form
const rules = {
  courseName: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入名称'
  },
  courseCategory: {
    required: true,
    message: '请选择所属分类'
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const confirmForm = (e: { preventDefault: () => void }) => {
  // e.preventDefault();
  formBtnLoading.value = true;
  formRef.value.validate((errors: any) => {
    if (!errors) {
      setTimeout(async () => {
        if (addOrEdit.value === true) {
          console.log(formParams);
          const params = {
            id: '',
            courseId: formParams.courseCategory,
            categoryName: formParams.courseName,
            categoryDescribe: formParams.note
          };
          const result = await addExampaperclassification(params);
          if (!result.error) {
            message.success(`新建成功`);
          }
        } else {
          console.log(formParams);
          const params = {
            id: editID.value,
            courseId: formParams.courseCategory,
            categoryName: formParams.courseName,
            categoryDescribe: formParams.note
          };
          const result = await addExampaperclassification(params);
          if (!result.error) {
            message.success(`修改成功`);
          }
        }

        emits('reloadTable');
        showModal.value = false;
      });
      showForm.value = null;
    } else {
      message.error('请填写完整信息');
    }
    formBtnLoading.value = false;
  });
};

defineExpose({ showModalFn, editModalFn });
</script>
