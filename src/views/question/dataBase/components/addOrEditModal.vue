<!--
 * @Author: ZHENG
 * @Date: 2022-05-12 17:34:13
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-28 15:33:14
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
        <n-form-item label="题库名称" path="bankName">
          <n-input v-model:value="formParams.bankName" placeholder="请输入题库名称" />
        </n-form-item>
        <n-form-item label="题库分类" path="bankType">
          <n-cascader
            v-model:value="formParams.bankType"
            clearable
            default-value="微积分/数学"
            placeholder="请选择题库分类"
            :options="categoryNameOptions"
            :check-strategy="'child'"
            :show-path="true"
            remote
            :on-load="handleLoad"
          />
        </n-form-item>
        <n-form-item label="绑定课程" path="courseId">
          <n-select v-model:value="formParams.courseId" :options="teacherCourseList" placeholder="请绑定课程" />
        </n-form-item>
        <n-form-item label="题库介绍" path="note">
          <n-input v-model:value="formParams.note" type="textarea" placeholder="课程介绍" />
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
import { CascaderOption, useMessage } from 'naive-ui';
import { addQuestionBank, editQuestionBank } from '@/service';
import { deafultFormParams } from '@/utils';
import { getCategoryName, getChildren, getTeacherCourseList } from '../getOptions';

const showModal = ref(false);
const showForm = ref<boolean | null>(null);
const formBtnLoading = ref(false);
const formRef = ref();
const message = useMessage();
const addOrEdit = ref(false);

// 新增修改的Form
const rules = {
  bankName: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入题库名称'
  },
  bankType: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请选择题库分类'
  },
  courseId: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请选择绑定课程'
  }
};
const emits = defineEmits(['reloadTable']);
const formParams = reactive({
  id: 0,
  bankType: '',
  bankName: '',
  courseId: '',
  note: ''
});
const categoryNameOptions = ref();
const teacherCourseList = ref();
const getOption = async () => {
  categoryNameOptions.value = await getCategoryName();
  teacherCourseList.value = await getTeacherCourseList();
};
getOption();
const handleLoad = (option: CascaderOption) => {
  return new Promise<void>(resolve => {
    categoryNameOptions.value.children = getChildren(option);
    resolve();
  });
};
/**
 * @author: ZHENG
 * @description: 新增的弹窗,在这里会修改数据
 * @param {*} record
 * @return {*}
 */
const showAddModalFn = () => {
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
  const { id, bankType, courseId, bankName, note, categoryParent } = record;
  for (let i = 0; i < categoryNameOptions.value.length; i++) {
    if (categoryNameOptions.value[i].value === categoryParent) {
      handleLoad(categoryNameOptions.value[i]);
    }
  }
  formParams.bankType = bankType;
  formParams.bankName = bankName;
  formParams.courseId = courseId;
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
          const { bankType, bankName, courseId, note } = formParams;
          const params = {
            bankType,
            bankName,
            courseId,
            note
          };
          const result = await addQuestionBank(params);
          if (!result.error) {
            message.success(`新建成功`);
          }
        } else {
          // 修改
          const { id, bankType, bankName, courseId, note } = formParams;
          const params = {
            id,
            bankType,
            bankName,
            courseId,
            note
          };
          const result = await editQuestionBank(params);
          if (!result.error) {
            message.success(`修改成功`);
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
