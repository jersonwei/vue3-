<!--
 * @Author: ZHENG
 * @Date: 2022-05-12 17:34:13
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-01 17:52:24
 * @FilePath: \work\src\views\test\pointManager\components\delModal.vue
 * @Description:
-->
<template>
  <n-modal
    v-model:show="showDelModal"
    :mask-closable="false"
    preset="dialog"
    type="error"
    title="确认"
    :content="`确认删除${delType ? '知识点分类' : '知识点'}${delType ? delData?.categoryName : delData?.pointName}`"
    positive-text="确认"
    negative-text="算了"
    @positive-click="onPositiveClick"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { delPointCategory, delKnowledgePoint } from '@/service';

const message = useMessage();
const showDelModal = ref(false);
const delData = ref();
const delType = ref();

const emits = defineEmits(['reloadTable']);

const showDelModalFn = (record: Recordable, type: string) => {
  delData.value = record;
  showDelModal.value = true;
  console.log(delData.value);
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
  if (delType.value) {
    // 删除知识点分类
    const params = {
      id: delData.value.id
    };
    const result = await delPointCategory(params);
    if (result.data === '200') {
      message.success('删除数据成功');
    }
  } else {
    // 删除知识点
    const params = {
      id: delData.value.id
    };
    const result = await delKnowledgePoint(params);
    if (result.data === '200') {
      message.success('删除数据成功');
    }
  }

  emits('reloadTable');
};
</script>
