<!--
 * @Author: ZHENG
 * @Date: 2022-05-12 17:34:13
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-31 16:47:50
 * @FilePath: \work\src\views\test\pointManager\components\addOrEditPointModal.vue
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
    :title="`${addOrEdit ? '新增' : '修改'}知识点`"
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
        <n-form-item label="所属分类" path="categoryName">
          <n-input v-model:value="formParams.categoryName" disabled placeholder="请输入分类名称" />
        </n-form-item>
        <n-form-item label="知识点名称" path="pointName">
          <n-input v-model:value="formParams.pointName" placeholder="请输入知识点名称" />
        </n-form-item>
        <n-form-item label="状态" path="status">
          <n-radio-group v-model:value="formParams.status" name="radiogroup">
            <n-space>
              <n-radio v-for="song in songs" :key="song.value" :value="song.value">
                {{ song.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
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
import { addKnowledgePoint, editKnowledgePoint } from '@/service';
import { deafultFormParams } from '@/utils';

const showModal = ref(false);
const showForm = ref<boolean | null>(null);
const formBtnLoading = ref(false);
const formRef = ref();
const message = useMessage();
const addOrEdit = ref(false);

// 新增修改的Form
const rules = {
  pointName: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入名称'
  }
};
const emits = defineEmits(['reloadTable']);
const formParams = reactive({
  id: 0,
  categoryId: '',
  categoryName: '',
  pointName: '',
  status: 1
});
const songs = [
  {
    value: 1,
    label: '启用'
  },
  {
    value: 0,
    label: '禁用'
  }
];
/**
 * @author: ZHENG
 * @description: 新增的弹窗,在这里会修改数据
 * @param {*} record
 * @return {*}
 */
const showAddModalFn = (record: Recordable) => {
  deafultFormParams(formParams);
  const { id, categoryName } = record;
  formParams.categoryId = id;
  formParams.categoryName = categoryName;
  formParams.status = 1;
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
  console.log(record);
  const { id, pointName, status } = record;
  formParams.status = status;
  // formParams.categoryName = categoryParentName;
  formParams.pointName = pointName;
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
          const { pointName, status, categoryId } = formParams;
          const params = {
            categoryId,
            pointName,
            status,
            note: ''
          };
          const result = await addKnowledgePoint(params);
          if (!result.error) {
            message.success(`新建成功`);
          }
        } else {
          // 修改
          const { id, categoryId, pointName, status } = formParams;
          const params = {
            id,
            categoryId,
            pointName,
            status,
            note: ''
          };
          const result = await editKnowledgePoint(params);
          if (!result.error) {
            message.success(`新建成功`);
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
