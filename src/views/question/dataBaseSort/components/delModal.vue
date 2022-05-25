<!--
 * @Author: ZHENG
 * @Date: 2022-05-12 17:34:13
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-25 12:01:22
 * @FilePath: \work\src\views\question\dataBaseSort\components\delModal.vue
 * @Description:
-->
<template>
  <n-modal
    v-model:show="showDelModal"
    :mask-closable="false"
    preset="dialog"
    type="error"
    title="确认"
    :content="`确认删除题库分类${delText}`"
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
const delText = ref();

const emits = defineEmits(['reloadTable']);
const showDelModalFn = () => {};

defineExpose({ showDelModalFn });

// 删除表格值
// eslint-disable-next-line consistent-return
const onPositiveClick = async () => {
  if (!delData.value) {
    return message.error('删除数据异常');
  }
  const param = {
    id: delData.value
  };
  const result = await deleteQuestionBankCategory(param);
  if (result.data === '200') {
    message.success('删除数据成功');
  }
  emits('reloadTable');
};
</script>
