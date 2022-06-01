<!--
 * @Author: ZHENG
 * @Date: 2022-06-01 16:21:58
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-01 16:36:20
 * @FilePath: \work\src\views\test\examManager\components\showExamModal.vue
 * @Description:
-->
<template>
  <n-modal v-model:show="showExamModal" style="width: 80%" :mask-closable="false" preset="dialog" title="试卷详情">
    <n-scrollbar style="max-height: 80%">
      <p></p>
      我们在田野上面找猪<br />
      想象中已找到了三只<br />
      小鸟在白云上面追逐<br />
      它们在树底下跳舞<br />
      啦啦啦啦啦啦啦啦咧<br />
      啦啦啦啦咧<br />
      我们在想象中度过了许多年<br />
      想象中我们是如此的疯狂<br />
      我们在城市里面找猪<br />
      想象中已找到了几百万只<br />
      小鸟在公园里面唱歌<br />
      它们独自在想象里跳舞<br />
      啦啦啦啦啦啦啦啦咧<br />
      啦啦啦啦咧<br />
      我们在想象中度过了许多年<br />
      许多年之后我们又开始想象<br />
      啦啦啦啦啦啦啦啦咧
    </n-scrollbar>
  </n-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { delPaper, getPaperDetail } from '@/service';

const showExamModal = ref(false);
const paper = ref();
// const emits = defineEmits(['reloadTable']);
const showModal = async record => {
  showExamModal.value = true;
  const param = {
    id: record.id
  };
  const result = await getPaperDetail(param);
  paper.value = result;
};

defineExpose({ showModal });

// 删除表格值
// eslint-disable-next-line consistent-return
// const onPositiveClick = async () => {
//   if (!props.delData) {
//     return message.error('删除数据异常');
//   }
//   const param = {
//     id: props.delData
//   };
//   const result = await delPaper(param);
//   if (result.data === '200') {
//     message.success('删除数据成功');
//   }
//   emits('reloadTable');
// };
</script>
