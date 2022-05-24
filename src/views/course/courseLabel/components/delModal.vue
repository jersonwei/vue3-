<!--
 * @Author: ZHENG
 * @Date: 2022-05-17 10:16:38
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-21 17:35:35
 * @FilePath: \work\src\views\course\courseLabel\components\delModal.vue
 * @Description:
-->
<template>
  <n-modal
    v-model:show="showDelModal"
    :mask-closable="false"
    preset="dialog"
    type="error"
    title="确认"
    :content="`确认删除课程标签${delText}`"
    positive-text="确认"
    negative-text="算了"
    @positive-click="onPositiveClick"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { deleteLabel } from '@/service';

const message = useMessage();
const showDelModal = ref(false);
interface Props {
  delData: number;
  delText: string;
}
const props = withDefaults(defineProps<Props>(), {
  delData: 0,
  delText: ''
});
const emits = defineEmits(['reloadTable']);

defineExpose({ showDelModal });

// 删除表格值
// eslint-disable-next-line consistent-return
const onPositiveClick = async () => {
  if (!props.delData) {
    return message.error('删除数据异常');
  }
  const result = await deleteLabel(props.delData);
  console.log(result);
  if (result.data) {
    message.success('删除数据成功');
  }
  emits('reloadTable');
};
</script>
