<!--
 * @Author: ZHENG
 * @Date: 2022-05-12 17:34:13
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-26 08:55:48
 * @FilePath: \work\src\views\question\knowledge\components\delModal.vue
 * @Description:
-->
<template>
  <n-modal
    v-model:show="showDelModal"
    :mask-closable="false"
    preset="dialog"
    type="error"
    title="确认"
    :content="`确认删除${delType ? '知识点分类' : '知识点'}${delData?.categoryName}`"
    positive-text="确认"
    negative-text="算了"
    @positive-click="onPositiveClick"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { deleteQuestionBankCategory } from '@/service';

const message = useMessage();
const showDelModal = ref(false);
const delData = ref();
const delType = ref();

const emits = defineEmits(['reloadTable']);

const showDelModalFn = (record: Recordable, type: string) => {
  delData.value = record;
  showDelModal.value = true;
  console.log(delType.value);
  if (type === '1') {
    delType.value = true;
  } else {
    delType.value = false;
  }
};

defineExpose({ showDelModalFn });

// 删除表格值
// eslint-disable-next-line consistent-return
const onPositiveClick = async () => {
  if (!delData.value) {
    return message.error('删除数据异常');
  }
  const params = {
    id: delData.value.id,
    categoryParent: delData.value.categoryParent
  };

  const result = await deleteQuestionBankCategory(params);
  if (result.data === '200') {
    message.success('删除数据成功');
  }
  emits('reloadTable');
};
</script>
