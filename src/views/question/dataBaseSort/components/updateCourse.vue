<!--
 * @Author: ZHENG
 * @Date: 2022-05-20 16:40:06
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-23 21:12:21
 * @FilePath: \work\src\views\question\dataBaseSort\components\updateCourse.vue
 * @Description:
-->
<template>
  <n-modal v-model:show="showUpdateModal" :mask-closable="false" preset="dialog" title="确认上架时间">
    <n-form ref="formRef" :model="formParams" label-placement="left" :label-width="120" class="m-2 py-4">
      <n-form-item label="定时上架时间" path="time">
        <n-date-picker
          v-model:value="formParams.time"
          :is-date-disabled="disablePreviousDate"
          type="datetime"
          clearable
        />
      </n-form-item>
    </n-form>
    <template #action>
      <n-space>
        <n-button @click="() => (showUpdateModal = false)">取消</n-button>
        <n-button type="info" :loading="formBtnLoading" @click="onPositiveClick">确定</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useMessage } from 'naive-ui';
import { format } from 'date-fns';
import { updateCourseStatusAuto } from '@/service';
import { disablePreviousDate } from '@/utils';

const date = new Date();
const formParams = reactive({
  time: Date.now()
});
const message = useMessage();
const showUpdateModal = ref(false);
interface Props {
  updateData: number;
}
const props = defineProps<Props>();
const emits = defineEmits(['reloadTable']);

defineExpose({ showUpdateModal });

// 删除表格值
// eslint-disable-next-line consistent-return
const onPositiveClick = async () => {
  console.log(props.updateData);
  const params = {
    CourseId: props.updateData.id,
    status: 1,
    launchTime: format(formParams.time, 'yyyy-MM-dd HH:mm:ss')
  };
  if (formParams.time <= Date.now()) {
    return message.error('时间异常，不允许定时当前时间');
  }
  const result = await updateCourseStatusAuto(params);

  if (result.data === '200') {
    message.success('定时数据成功');
  }
  showUpdateModal.value = false;
  emits('reloadTable');
};
</script>
