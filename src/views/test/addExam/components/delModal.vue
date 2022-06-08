<!--
 * @Author: ZHENG
 * @Date: 2022-05-12 17:34:13
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-03 21:30:50
 * @FilePath: \work\src\views\test\addExam\components\delModal.vue
 * @Description:
-->
<template>
  <n-modal
    v-model:show="showDelModal"
    :mask-closable="false"
    preset="dialog"
    type="error"
    title="确认"
    :content="`确认删除课程${delText}`"
    positive-text="确认"
    negative-text="取消"
    @positive-click="onPositiveClick"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { deleteCourse } from '@/service';

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
  const param = {
    id: props.delData
  };
  const result = await deleteCourse(param);
  if (result.data === '200') {
    message.success('删除数据成功');
  }
  emits('reloadTable');
};
</script>
